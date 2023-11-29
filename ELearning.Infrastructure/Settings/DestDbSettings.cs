namespace ELearning.Infrastructure.Settings
{
    public class DestDbSettings : IDestDbSettings
    {
        public string DestDatabaseName { get; set; }
        public string DestConnectionString { get; set; }
    }
}
