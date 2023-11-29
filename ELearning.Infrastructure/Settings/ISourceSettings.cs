namespace ELearning.Infrastructure.Settings
{
    public interface ISourceSettings
    {
        public string SourceDatabaseName { get; set; }
        public string SourceConnectionString { get; set; }
    }
}
