using ELearning.Domain.Entities;

namespace ELearning.Application.DTOs
{
    public class CourseDto
    {
        public string Title { get; set; }

        public List<Category> Categories { get; set; }

        public string Description { get; set; }

        public string Author { get; set; }
    }
}
