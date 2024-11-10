using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace sklep_project_api.Services
{
    public class CustomService : ICustomService
    {
        //private const string connectionUri = "mongodb://localhost:27017/";
        private const string connectionUri = "mongodb://root:example@mongodb_shop:27017/";
        private const string databaseName = "olxdb";
        private const string collectionName = "items";

        private const string jsonCacheDataFileName = "cache_big.json";

        private IMongoCollection<BsonDocument>? manageConnectionToMongoDB()
        {
            var settings = MongoClientSettings.FromConnectionString(connectionUri);
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var client = new MongoClient(settings);
            var database = client.GetDatabase(databaseName);
            var collection = database.GetCollection<BsonDocument>(collectionName);
            return collection;
        }

        public string MakeResponseInJSON(string message)
        {

            return $"{{ \"data\":\"{message}\"}}";
        }

        public string GetAPIStatus()
        {
            Console.WriteLine("api test request");
            return MakeResponseInJSON("API work properly.");
        }


        public string GetDataFromLocalMongoDB()
        {
            try
            {
                var collection = manageConnectionToMongoDB();
                var filter = Builders<BsonDocument>.Filter.Empty;
                var documents = collection.Find(filter).ToList();
                if (collection.Find(filter).CountDocuments() > 0)
                {
                    var elo = collection.Indexes.List();

                     elo.ForEachAsync(index =>
                    {
                        Console.WriteLine(index.ToJson());
                    });                    
                    var dotNetObjList = documents.ConvertAll(BsonTypeMapper.MapToDotNetValue);
                    Console.WriteLine($"returned {documents.ToList().Count()} documents from collection '{collectionName}' in '{databaseName}' database");
                    var json_tekst = JsonConvert.SerializeObject(dotNetObjList);
                    return json_tekst;
                }
                else return $"{{ \"data\":\"no data in db\"}}";
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return $"retrieving data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }



        public string InsertDataToLocalMongoDB()
        {
            try
            {
                var collection = manageConnectionToMongoDB();


                var document = new BsonDocument
                                                {
                                                    { "name", "John" },
                                                    { "age", 30 },
                                                    { "city", "New York" }

                                                };
                collection.InsertOne(document);
                string response = $"Data was added to collection '{collectionName}' in '{databaseName}' databse.";
                Console.WriteLine(response);
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);                
            }
            return $"inserting data to collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }



        public string GetDataFromJsonFile()
        {
            //string workingDirectory = Environment.CurrentDirectory; // This will get the current WORKING directory (i.e. \bin\Debug)
            //string folderPath = workingDirectory + "\\cache_data\\" + "";
            Console.WriteLine("sent data from json file");
            string txt = File.ReadAllText(jsonCacheDataFileName);
            JObject data = JObject.Parse(txt);
            var products = data["data"];

            var listJson = products.ToList();

            List<string> list = new List<string>();
            foreach( var j in listJson)
            {
                var smth = j["title"].ToString();
                Console.WriteLine(smth);
                list.Add(smth);
            }

            string allJson = string.Join(Environment.NewLine, listJson);
            string little = string.Join(Environment.NewLine, list);
            return little;
            //Console.WriteLine(data);
        }        

        public async Task<string> GetDataFromOLX()
        {
            string json = "";
            using (HttpClient httpClient = new HttpClient())
            {
                //string url ="https://jsonplaceholder.typicode.com/posts";
                string url = "https://www.olx.pl/api/v1/offers/?offset=1&limit=1&query=rtx&filter_refiners=spell_checker&sl=18bcd78b870x2cf76a98";
                var result = await httpClient.GetAsync(url);
                json = await result.Content.ReadAsStringAsync();
                var oMycustomclassname = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(json);
                JObject data = JObject.Parse(json);

                Console.WriteLine(oMycustomclassname);
                Console.WriteLine();
                Console.WriteLine(data);

            }
            return json;
        }

        public string SeedDataToLocalMongoDB()
        {
            try
            {
                var collection = manageConnectionToMongoDB();

                string txt = File.ReadAllText(jsonCacheDataFileName);
                JObject data = JObject.Parse(txt);
                var products = data["data"];
                var listJson = products.ToList();
                string response = "";
                foreach (var j in listJson)
                {
                    response += j["title"].ToString() + "\n";
                    BsonDocument bsonData = BsonDocument.Parse(j.ToString());
                    //Console.WriteLine(j["title"].ToString());
                    collection.InsertOne(bsonData);

                }                
                response = $"{products.Count()} items was added to collection '{collectionName}' in '{databaseName}' databse.";
                Console.WriteLine(response);
                response = MakeResponseInJSON(response);
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return $"seeding data to collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }


        public string DeleteAllDataInLocalMongoDB()
        {
            try
            {
                var collection = manageConnectionToMongoDB();
                var filter = Builders<BsonDocument>.Filter.Empty;
                var documentses = collection.Find(filter).ToList();
                var result = collection.DeleteMany(filter);
                if (result.IsAcknowledged)
                {
                    Console.WriteLine($"Deleted {result.DeletedCount} items in collection '{collectionName}' in '{databaseName}' database");
                }
                else
                {
                    Console.WriteLine("Data not deleted.");
                }
                string response = MakeResponseInJSON($"Deleted {result.DeletedCount} items in collection '{collectionName}' in '{databaseName}' database");
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return $"deleting data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }

        public string DeleteOneDataInLocalMongoDB(string _id)
        {
            try
            {
                ObjectId object_id = ObjectId.Parse(_id);
                var collection = manageConnectionToMongoDB();
                var filter = Builders<BsonDocument>.Filter.Eq("_id", object_id);
                var result = collection.DeleteOne(filter);
                if (result.IsAcknowledged)
                {
                    Console.WriteLine($"Deleted {_id} {result.DeletedCount} items in collection '{collectionName}' in '{databaseName}' database");
                }
                else
                {
                    Console.WriteLine("Data not deleted.");
                }
                string response = MakeResponseInJSON($"Deleted {result.DeletedCount} items _id:{_id} in collection '{collectionName}' in '{databaseName}' database");
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return $"deleting data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }


        public string UpdateOneDataInLocalMongoDB(string _id,string json_string)
        {
            try
            {
                BsonDocument formData = BsonDocument.Parse(json_string);
                ObjectId object_id = ObjectId.Parse(_id);

                formData.Remove("_id");
                var collection = manageConnectionToMongoDB();
                var filter = Builders<BsonDocument>.Filter.Eq("_id", object_id);
                var result = collection.ReplaceOne(filter, formData);
                if (result.IsAcknowledged)
                {
                    Console.WriteLine($"Update {_id} {result} items in collection '{collectionName}' in '{databaseName}' database");
                }
                else
                {
                    Console.WriteLine("Data not deleted.");
                }
                string response = MakeResponseInJSON($"Update {result} items _id:{_id} in collection '{collectionName}' in '{databaseName}' database"); 
                return response;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return $"Update data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ";
        }


        public string GetSpecificDataFromDB(string property)
        {
            string res = "";
            try
            {
                var collection = manageConnectionToMongoDB();
                if (collection.Find(Builders<BsonDocument>.Filter.Empty).CountDocuments() > 0)
                {
                    var aggregate = collection.Aggregate().Project(new BsonDocument("_id", 0).Add(property, $"${property}"));
                    var result = aggregate.ToList();
                    string allJson = string.Join(Environment.NewLine, result);

                    return allJson;
                }
                else return $"no data in collection '{collectionName}' in '{databaseName}' database"; ;
            }
            catch (Exception ex)
            {
                res += ex.Message;
                Console.WriteLine(ex.Message);
            }

            if (res.Count() < 100)
            {
                res = "data with " + res;
                return res;
            }
            else
                return $"getting data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ ";
        }

        public string FilterByDescriptionAndReturnDataFromDB(string property, bool ascending)
        {
            Console.WriteLine($"property: {property} | ascending: {ascending}");
            string res = "";
            try
            {
                var collection = manageConnectionToMongoDB();
                var filter = property != "" ? Builders<BsonDocument>.Filter.Regex("description", new BsonRegularExpression(property, "i")) : Builders<BsonDocument>.Filter.Empty; 
                if (collection.Find(Builders<BsonDocument>.Filter.Empty).CountDocuments() > 0)
                {
                    var sortDefinition = ascending
                    ? Builders<BsonDocument>.Sort.Ascending("params.0.value.value")
                    : Builders<BsonDocument>.Sort.Descending("params.0.value.value");                  
                    var documentses = collection.Find(filter).Sort(sortDefinition).ToList();
                    var sortedDocuments = documentses.OrderBy(doc => doc["params"][0]["value"]["value"].AsInt32).ToList();
                    var dotNetObjList = documentses.ConvertAll(BsonTypeMapper.MapToDotNetValue);
                    Console.WriteLine($"returned {documentses.ToList().Count()} documents from collection '{collectionName}' in '{databaseName}' database");
                    var json_tekst = JsonConvert.SerializeObject(dotNetObjList);
                    return json_tekst;
                }
                else return $"no data in collection '{collectionName}' in '{databaseName}' database"; ;
            }
            catch (Exception ex)
            {
                res += ex.Message;
                Console.WriteLine(ex.Message);
            }

            if (res.Count() < 100)
            {
                res = "data with " + res;
                return res;
            }
            else
                return $"getting data from collection '{collectionName}' in '{databaseName}' database was not succesfull ಠ_ಠ ";
        }



        public string InsertNewItemInLocalMongoDB(string json_string)
        {           
            try
            {                
                var collection = manageConnectionToMongoDB();
                JObject data = JObject.Parse(json_string);                            
                DateTimeOffset currentDateTimeOffset = DateTimeOffset.Now; // Get the current date and time with offset                
                string iso8601Datestring = currentDateTimeOffset.ToString("yyyy-MM-ddTHH:mm:sszzz"); // Format the current date and time as ISO 8601 string
                data["created_time"] = iso8601Datestring;
                BsonDocument bsonData = BsonDocument.Parse(data.ToString());
                collection.InsertOne(bsonData);
                return MakeResponseInJSON($"Data was inserted to collection '{collectionName}' in '{databaseName}'");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problemos: ",ex.Message);
                return MakeResponseInJSON($"Problemos: {ex.Message}");
            }                
        }

        








        


        //https://www.olx.pl/api/v1/offers/?offset=40&limit=50&query=rower%20elektryczny&category_id=1649&sort_by=created_at%3Adesc&filter_refiners=spell_checker&sl=18efbc47799x94e912f
    }
}
