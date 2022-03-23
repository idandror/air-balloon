using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Middlewares;
using backend.Models.Users;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace backend.Controllers
{
	[Authorize]
	[Controller]
	[Route("api/[controller]")]
	public class UsersController : BaseApiController
	{
		//private readonly TokenService tokenService;
		private readonly UserService service;
		//private readonly JwtUtils jwtUtils;
		public UsersController(UserService _service)
		{
			//jwtUtils = _jwtUtils;
			service = _service;
			//tokenService = _tokenService;
		}

		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			return HandleResult(await service.GetUsers());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetUser(string id)
		{
			var user = HandleResult(await service.GetUser(id));
			return user;
		}

		[AllowAnonymous]
		[Route("register")]
		[HttpPost]
		public async Task<IActionResult> CreateUser([FromBody] AppUser user)
		{
			var userCreated = HandleResult(await service.CreateUser(user));
			return await Login(user);
		}

		[AllowAnonymous]
		[Route("login")]
		[HttpPost]
		public async Task<IActionResult> Login([FromBody] AppUser user)
		{
			AppUser userFromDb = await service.Authenticate(user);
			if (userFromDb == null)
			{
				return Unauthorized();
			}
			Console.WriteLine(userFromDb);
			string token = service.CreateToken(userFromDb);
			if (token == null)
			{
				return Unauthorized();
			}
			return Ok(new { token, userFromDb.Id, userFromDb.UserName });
		}

		//[HttpPost("login")]
		//public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		//{
		//	var user = await _userManager.FindByEmailAsync(loginDto.Email);


		//	if (user == null)
		//		return Unauthorized("Invalid User");
		//	var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

		//	//if (result.Succeeded)
		//	//{
		//	return CreateUserObject(user);
		//	//}
		//	//return Unauthorized("Invalid Password");

		//}

		//private UserDto CreateUserObject(AppUser user)
		//{
		//	return new UserDto
		//	{
		//		Token = tokenService.CreateToken(user),
		//		Username = user.UserName
		//	};
		//}
	}
}