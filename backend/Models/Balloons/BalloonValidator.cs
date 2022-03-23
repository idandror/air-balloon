using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;

namespace backend.Models.Balloons
{
	public class BalloonValidator : AbstractValidator<Balloon>
	{
		public BalloonValidator()
		{
			RuleFor(x => x.name).NotEmpty().Length(2, 25);
			RuleFor(x => x.description).NotEmpty().Length(2, 150);
			RuleFor(x => x.type).NotEmpty().Must(type => validateTypes(type));
			RuleFor(x => x.color).NotEmpty().Must(color => validateColor(color));
			RuleFor(x => x.altitude).NotEmpty();
			RuleFor(x => x.latitude).NotEmpty();
			RuleFor(x => x.longitude).NotEmpty();
		}


		private bool validateColor(string color)
		{
			string[] colors = new string[4] { "Black", "White", "Red", "Blue" };
			return colors.Contains(color);
		}


		private bool validateTypes(string type)
		{
			string[] types = new string[4] { "small", "medium", "big", "double" };
			return types.Contains(type);
		}
	}
}