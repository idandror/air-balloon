using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Services;

namespace backend.Middlewares
{
	public class JwtMiddleware
	{
		private readonly RequestDelegate _next;
		public JwtMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public async Task Invoke(HttpContext context, UserService userService)
		{
			if (!System.String.IsNullOrEmpty(context.Request.Headers["Authorization"]))
			{
				var token = context.Request.Headers["Authorization"].First().Split(" ").Last();
				Console.WriteLine(token);
				string userId = userService.ValidateToken(token);
				Console.WriteLine(userId);
				if (userId != null)
				{
					// attach user to context on successful jwt validation
					context.Items["User"] = userService.GetUser(userId);
				}
			}
			await _next(context);
		}

	}
}