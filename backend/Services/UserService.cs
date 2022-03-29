using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Application;
using backend.Models;
using backend.Models.Users;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Services
{
	public interface IUserService
	{
		public Task<Result<AppUser>> GetUser(string id);
		public Task<Result<List<AppUser>>> GetUsers();
	}
	public class UserService : AbstractValidator<UserValidator>
	{
		private readonly IMongoCollection<AppUser> users;
		private readonly IConfiguration _configuration;

		UserValidator validator = new UserValidator();
		public UserService(IOptions<MongoDBSettings> mongoDBSettings, IConfiguration configuration)
		{
			_configuration = configuration;
			MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
			IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
			users = database.GetCollection<AppUser>(mongoDBSettings.Value.UsersCollection);


		}


		public async Task<Result<List<AppUser>>> GetUsers()
		{
			var user = await users.FindAsync(user => true);
			if (user == null)
				return Result<List<AppUser>>.Failure("No Users");
			else
				return Result<List<AppUser>>.Success(user.ToList());
		}

		public async Task<Result<AppUser>> GetUser(string id)
		{
			if (id.Length == 24)
			{
				AppUser user = await users.Find(user => user.Id == id).FirstAsync();
				return Result<AppUser>.Success(user);
			}
			else
			{
				return Result<AppUser>.Failure("Could not find user");
			}
		}

		public async Task<Result<AppUser>> CreateUser(AppUser user)
		{
			ValidationResult result = validator.Validate(user);
			AppUser existingUser = await users.Find(us => us.UserName == user.UserName).FirstOrDefaultAsync();
			if (existingUser == null)
			{
				user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
				await users.InsertOneAsync(user);
				return Result<AppUser>.Success(user);
			}
			return Result<AppUser>.Failure(result.ToString());

		}

		public async Task<AppUser> Authenticate(AppUser user)
		{
			//var found = users.Find(new BsonDocument { { "email",(user.Email) } }).FirstAsync().Result;
			AppUser foundUser = await users.Find(x => x.UserName == user.UserName).FirstAsync();
			//AppUser foundUser = (AppUser)await users.FindAsync<AppUser>(us => us.Email == user.Email);
			if (foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
				return null;
			return foundUser;
		}



		public string CreateToken(AppUser user)
		{
			//var claims = new List<Claim>
			//{
			//	//new Claim(ClaimTypes.Name,user.UserName),
			//	//new Claim(ClaimTypes.NameIdentifier,user.Id),
			//	new Claim(ClaimTypes.Email,user.Email),
			//};

			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.ASCII.GetBytes(_configuration["JwtKey"]);
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
				Expires = DateTime.UtcNow.AddHours(1),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);

			return tokenHandler.WriteToken(token);
		}


		public string ValidateToken(string token)
		{

			if (token == null)
			{
				return null;
			}
			var tokenHandler = new JwtSecurityTokenHandler();
			var tokenKey = Encoding.ASCII.GetBytes(_configuration["JwtKey"]);
			Console.WriteLine("-------------------->>>>" + _configuration["JwtKey"]);

			try
			{
				tokenHandler.ValidateToken(token, new TokenValidationParameters
				{
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(tokenKey),
					ValidateIssuer = false,
					ValidateAudience = false,
					// set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
					ClockSkew = TimeSpan.Zero
				}, out SecurityToken validatedToken);
				var jwtToken = (JwtSecurityToken)validatedToken;
				string userId = jwtToken.Claims.First(x => x.Type == "id").Value;
				// return user id from JWT token if validation successful
				return userId;
			}
			catch (System.Exception)
			{

				return null;
			}

		}

	}
}