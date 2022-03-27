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
		private readonly UserService service;
		public UsersController(UserService _service)
		{
			service = _service;
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
			string token = service.CreateToken(userFromDb);
			if (token == null)
			{
				return Unauthorized();
			}
			return Ok(new { token, userFromDb.Id, userFromDb.UserName });
		}

		
	}
}