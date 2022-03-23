using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;
namespace backend.Models.Balloons
{
	public class Balloon
	{
		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		public string name { get; set; } 
		public string description { get; set; } 
		public string type { get; set; } 
		public string color { get; set; }
		public double longitude { get; set; }
		public double latitude { get; set; }
		public double altitude { get; set; }
	}
}