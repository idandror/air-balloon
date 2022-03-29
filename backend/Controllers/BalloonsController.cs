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

			Balloon balloon = await _mongoDBService.GetBalloon(id);
			return balloon;
		}


		[Route("getAll")]
		[HttpGet]
		public async Task<List<Balloon>> GetAll()
		{
			//string token = HttpContext.Request.Headers["Authorization"].FirstOrDefault().Split(" ").Last();
			return await _mongoDBService.GetAllBalloons();
		}

		[Route("create")]
		[HttpPost]
		public async Task<IActionResult> Create([FromBody] Balloon balloon)
		{
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
