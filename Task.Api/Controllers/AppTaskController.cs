using MediatR;
using Microsoft.AspNetCore.Mvc;
using Task.Application.Commands;
using Task.Application.DTOs;
using Task.Application.Queries;

namespace Task.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppTaskController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AppTaskController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/AppTask
        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var query = new GetAllAppTasksQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        // GET: api/AppTask/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id)
        {
            var query = new GetAppTaskByIdQuery(id);
            var result = await _mediator.Send(query);
            return result == null ? NotFound() : Ok(result);
        }

        // POST: api/AppTask
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] AppTaskDto taskDto)
        {
            var command = new CreateAppTaskCommand(taskDto);
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetTaskById), new { id = result }, taskDto);
        }

        // PUT: api/AppTask/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] AppTaskDto taskDto)
        {
            if (id != taskDto.AppTaskID)
                return BadRequest("Task ID mismatch");

            var command = new UpdateAppTaskCommand(taskDto);
            var result = await _mediator.Send(command);
            return result ? NoContent() : NotFound();
        }

        // DELETE: api/AppTask/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var command = new DeleteAppTaskCommand(id);
            var result = await _mediator.Send(command);
            return result ? NoContent() : NotFound();
        }
    }
}

