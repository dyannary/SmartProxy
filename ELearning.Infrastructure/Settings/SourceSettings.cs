namespace ELearning.Infrastructure.Settings
{
    public class SourceSettings : ISourceSettings
    {
        public string SourceDatabaseName { get; set; }
        public string SourceConnectionString { get; set; }
    }
}
