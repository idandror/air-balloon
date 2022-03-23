using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace backend.Middlewares
{
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
	public class AuthorizeAttribute : Attribute, IAuthorizationFilter
	{
		public void OnAuthorization(AuthorizationFilterContext context)
		{
			// skip authorization if action is decorated with [AllowAnonymous] attribute
			var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            Console.WriteLine(allowAnonymous);
			if (allowAnonymous)
				return;

			// authorization
			var user = context.HttpContext.Items["User"];
			if (user == null)
				context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
		}
	}
}