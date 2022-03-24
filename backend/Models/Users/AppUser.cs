using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models.Users
{
	public class AppUser
	{

		[BsonId]
		[BsonRepresentation(BsonType.ObjectId)]
		public string Id { get; set; }
		[BsonElement("UserName")]
		public string UserName { get; set; }
		[BsonElement("Name")]
		public string Name { get; set; }
		[BsonElement("Password")]
		public string Password { get; set; }

	}
}