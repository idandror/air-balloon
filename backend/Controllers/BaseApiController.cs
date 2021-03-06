using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
	[Route("api/[controller]")]
	public class BaseApiController : ControllerBase
	{
		protected ActionResult HandleResult<T>(Result<T> result)
		{

			if (result == null)
			{
				return NotFound();
			}
			if (result.IsSuccess && result.Value != null)
			{
				return Ok(result.Value);
			}
			if (result.IsSuccess && result.Value == null)
			{
				return NotFound();
			}
			return BadRequest(result.Error);
		}

	}
}