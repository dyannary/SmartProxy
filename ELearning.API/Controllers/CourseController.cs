using ELearning.Domain.Entities;
using ELearning.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly IDestinationRepository<Course> _destinationRepository;
        private readonly ISourceRepository<Course> _sourceRepository;
        public CourseController(IDestinationRepository<Course> destinationRepository, ISourceRepository<Course> sourceRepository)
        {
            _destinationRepository = destinationRepository;
            _sourceRepository = sourceRepository;
        }

        [HttpGet]
        public List<Course> GetAllCourses()
        {
            var records = _destinationRepository.GetAllRecords();

            return records;
        }

        [HttpGet("{id}")]
        public Course GetCourseById(Guid id)
        {
            var result = _destinationRepository.GetRecordById(id);

            return result;
        }

        [HttpPost]
        public IActionResult AddCourse(Course course)
        {
            //de mutat intr-un serviciu aparte
            course.LastChangedTime = DateTime.UtcNow;

            _sourceRepository.InsertRecord(course);

            return Ok("Created");
        }

        [HttpPut]
        public IActionResult UpsertCourse(Course course)
        {
            if (course.Id == Guid.Empty)
            {
                return BadRequest("Empty Id");
            }

            course.LastChangedTime = DateTime.UtcNow;

            _sourceRepository.UpsertRecord(course);

            return Ok(course);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(Guid id)
        {
            var course = _destinationRepository.GetRecordById(id);

            if (course == null)
            {
                return BadRequest("Course does not exist");
            }

            _sourceRepository.DeleteRecord(id);

            return Ok("Deleted " + id);
        }
    }
}
