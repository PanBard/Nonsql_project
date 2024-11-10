using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using sklep_project_api.Services;
using ZstdSharp.Unsafe;

namespace sklep_project_api.Controllers
{
    [ApiController]
    [Route("api")]
    public class JustOrdinaryController : ControllerBase
    {
        private readonly ICustomService _customService;

        public JustOrdinaryController(ICustomService customService)
        {
            _customService = customService;
        }


        [HttpGet("allData")]
        public string GetData()
        {
            return _customService.GetDataFromLocalMongoDB();    
        }

        [HttpGet("api_test")]
        public string ApiTest()
        {
            return _customService.GetAPIStatus();
        }


        [HttpGet("addData")]
        public string AddData()
        {
            return _customService.InsertDataToLocalMongoDB();                 
        }

        [HttpGet("olx")]
        public Task<string> AdGetDataFromOLXdDa()
        {
           return _customService.GetDataFromOLX();
        }

        [HttpGet("json")]
        public string test()
        {
           return  _customService.GetDataFromJsonFile();
        }        

        [HttpGet("seed")] //https://localhost:7268/api/seed
        public string seed()
        {
            return _customService.SeedDataToLocalMongoDB();
        }

        [HttpGet("deleteAll")]
        public string deleteAll()
        {
            return _customService.DeleteAllDataInLocalMongoDB();
        }

        [HttpGet("getFilteredDataByDescription")] //np.  https://localhost:7268/api/getDataProperty/?property=Price&ascending=true
        public string getFilteredDataByDescription([FromQuery] string property="", bool ascending=true)
        {
            return _customService.FilterByDescriptionAndReturnDataFromDB(property, ascending);
        }

        [HttpGet("getDataProperty/{property}")] //np.  https://localhost:7268/api/getDataProperty/property
        public string getDataProperty([FromRoute] string property)
        {
            return _customService.GetSpecificDataFromDB(property);
        }

        [HttpDelete("deleteOne/{_id}")] //np.  https://localhost:7268/api/
        public string deleteOne([FromRoute] string _id)
        {
            return _customService.DeleteOneDataInLocalMongoDB(_id);
        }

        [HttpPost("insertOne/{_id}")] 
        public string One([FromBody] dynamic body, [FromRoute] string _id)
        {
            return _customService.UpdateOneDataInLocalMongoDB(_id.ToString(), body.ToString());
        }

        [HttpPost("insertNewItem")]
        public string insertNewItem([FromBody] dynamic body)
        {
            var response = _customService.InsertNewItemInLocalMongoDB(body.ToString());
            return $"{{ \"data\":\" {response} \"}}";
        }

    }
}