using ELearning.Application.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace ELearning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : Controller
    {
        public List<CourseDto> GetAllCourses()
        {
            return new List<CourseDto>();
        }
    }
}
