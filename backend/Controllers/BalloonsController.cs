using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Middlewares;
using backend.Models.Balloons;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
	[Authorize]
	[Controller]
	[Route("api/[controller]")]
	public class BalloonsController : BaseApiController
	{
		private readonly BalloonService _mongoDBService;

		public BalloonsController(BalloonService balloonService)
		{

			_mongoDBService = balloonService;
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Balloon>> GetBalloon(string id)
		{
			Console.WriteLine("id");
			Console.WriteLine(HttpContext.GetRouteData().Values["id"]);

			Balloon balloon = await _mongoDBService.GetBalloon(id);
			return balloon;
		}


		[Route("getAll")]
		[HttpGet]
		public async Task<List<Balloon>> GetAll()
		{
			string token = HttpContext.Request.Headers["Authorization"].FirstOrDefault().Split(" ").Last();
			Console.WriteLine(token);
			//string res = null;
			//if (token != null)
			//	res = service.ValidateToken(token);
			//if (res != null)
			//{
			return await _mongoDBService.GetAllBalloons();
			//}
			//else
			//{
			//	return null;
			//}

		}

		[Route("create")]
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Balloon balloon)
		{
			Console.WriteLine(balloon.Id);
			if (balloon.Id == null)
			{
				return HandleResult(await _mongoDBService.CreateBalloon(balloon));
			}
			return HandleResult(await _mongoDBService.UpdateBalloon(balloon));

		}


		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(string id)
		{
			var deletedBalloon = HandleResult(await _mongoDBService.DeleteBalloon(id));
			return deletedBalloon;
		}
	}
}
