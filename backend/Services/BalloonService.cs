using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Microsoft.Extensions.Options;
using backend.Models;
using backend.Models.Balloons;
using FluentValidation.Results;
using FluentValidation;
using backend.Application;

namespace backend.Services
{
	public class BalloonService : AbstractValidator<BalloonValidator>
	{
		private readonly IMongoCollection<Balloon> _balloonsCollection;
		private readonly HttpContext _context;

		BalloonValidator validator = new BalloonValidator();
		public BalloonService(IOptions<MongoDBSettings> mongoDBSettings)
		{
			MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
			IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
			_balloonsCollection = database.GetCollection<Balloon>(mongoDBSettings.Value.CollectionName);
		}

		public async Task<Result<Balloon>> CreateBalloon(Balloon balloon)
		{
			ValidationResult result = validator.Validate(balloon);
			if (!System.String.IsNullOrEmpty(balloon.description) || !System.String.IsNullOrEmpty(balloon.name))
			{
				await _balloonsCollection.InsertOneAsync(balloon);
				return Result<Balloon>.Success(balloon);
			}
			return Result<Balloon>.Failure(result.ToString());
		}


		public async Task<List<Balloon>> GetAllBalloons()
		{
			return await _balloonsCollection.Find(new BsonDocument()).ToListAsync();
		}
		public async Task<Balloon> GetBalloon(string id)
		{
			var token = _context.Request.Headers["Authorization"].FirstOrDefault().Split(" ").Last();
			Balloon bal = await _balloonsCollection.Find(balloon => balloon.Id == id).FirstAsync();
			return bal;

		}

		public async Task<Result<Balloon>> UpdateBalloon(Balloon balloon)
		{
			ValidationResult result = validator.Validate(balloon);
			if (result.IsValid)
			{
				try
				{
					var res = await _balloonsCollection.ReplaceOneAsync(b => b.Id == balloon.Id, balloon);
					if (res.ModifiedCount > 0)
					{
						return Result<Balloon>.Success(balloon);
					}
					return Result<Balloon>.Failure("Balloon Have no Updates");
				}
				catch (Exception e)
				{
					return Result<Balloon>.Failure(e.Message);
				}
			}
			return Result<Balloon>.Failure(result.ToString());
		}




		public async Task<Result<string>> DeleteBalloon(string id)
		{
			FilterDefinition<Balloon> filter = Builders<Balloon>.Filter.Eq("Id", id);
			var res = await _balloonsCollection.DeleteOneAsync(filter);
			if (res.IsAcknowledged)
			{
				return Result<string>.Success("deleted");
			}
			return Result<string>.Failure("could not delete Balloon");
		}
	}
}
