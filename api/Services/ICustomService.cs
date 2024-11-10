namespace sklep_project_api.Services
{
    public interface ICustomService
    {
        string DeleteAllDataInLocalMongoDB();
        string DeleteOneDataInLocalMongoDB(string _id);
        String GetDataFromJsonFile();
        string GetDataFromLocalMongoDB();
        Task<string> GetDataFromOLX();
        string InsertDataToLocalMongoDB();
        string UpdateOneDataInLocalMongoDB(string _id, string json_string);
        string FilterByDescriptionAndReturnDataFromDB(string property, bool ascending);
        string SeedDataToLocalMongoDB();
        string GetSpecificDataFromDB(string property);
        string InsertNewItemInLocalMongoDB(string json_string);
        string GetAPIStatus();
        string MakeResponseInJSON(string message);
    }
}