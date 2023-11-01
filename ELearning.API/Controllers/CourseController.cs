using ELearning.Application.DTOs;
using ELearning.Domain.Entities;
using ELearning.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.Core.Misc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : Controller
    {
        private readonly IMongoRepository<Course> _courseRepository;
        public CourseController(IMongoRepository<Course> courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet]
        public List<Course> GetAllCourses()
        {
            var records = _courseRepository.GetAllRecords();

            return records;
        }

        [HttpGet("{id}")]
        public Course GetCourseById(Guid id)
        {
            var result = _courseRepository.GetRecordById(id);

            return result;
        }

        [HttpPost]
        public IActionResult AddCourse(Course course)
        {
            //de mutat intr-un serviciu aparte
            course.LastChangedTime = DateTime.UtcNow;

            _courseRepository.InsertRecord(course);

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

            _courseRepository.UpsertRecord(course);

            return Ok(course);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteCourse(Guid id)
        {
            var course = _courseRepository.GetRecordById(id);

            if (course == null)
            {
                return BadRequest("Course does not exist");
            }

            _courseRepository.DeleteRecord(id);

            return Ok("Deleted " + id);
        }
    }
}
