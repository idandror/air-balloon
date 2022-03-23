using System.Text;
using backend.Middlewares;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
var policyName = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<BalloonService>();


builder.Services.AddCors(options =>
{
	options.AddPolicy(name: policyName,
					 builder =>
					 {
						 builder
						   .WithOrigins("http://localhost:3000") // specifying the allowed origin
						   .WithMethods("GET", "POST", "PUT", "DELETE")
						   //   .WithMethods("GET") // defining the allowed HTTP method
						   .AllowAnyHeader(); // allowing any header to be sent
					 });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddScoped<IJwtUtils, JwtUtils>();
//builder.Services.AddAuthentication(x =>
//{
//	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//}).AddJwtBearer(x =>
//{
//	x.RequireHttpsMetadata = false;
//	x.SaveToken = true;
//	x.TokenValidationParameters = new TokenValidationParameters
//	{
//		ValidateIssuerSigningKey = true,
//		IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtKey").ToString())),
//		ValidateIssuer = false,
//		ValidateAudience = false
//	};
//});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
//app.UseCors("CorsPolicy");
app.UseCors(policyName);

app.UseAuthentication();
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
