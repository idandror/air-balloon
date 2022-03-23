using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace backend.Models.Users
{
	public class UserValidator : AbstractValidator<AppUser>
	{
		public UserValidator()
		{
			RuleFor(x => x.Name).NotEmpty();
			RuleFor(x => x.Password).NotEmpty().Matches("^(?=.[0-9])(?=.[!@#$%^&*])");
			RuleFor(x => x.UserName).NotEmpty();
		}

	}
}