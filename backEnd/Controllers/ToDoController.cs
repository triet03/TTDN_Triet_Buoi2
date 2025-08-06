using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetAll()
        {
            return await _context.TodoItems.OrderByDescending(x => x.CreatedAt).ToListAsync();
        }

        [HttpPost]
        [HttpPost]
        public async Task<ActionResult<TodoItem>> Create([FromBody] TodoItem item)
        {
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = item.Id }, item);
        }


        [HttpPut("{id}")]
public async Task<IActionResult> Update(int id, TodoItem item)
{
    var existing = await _context.TodoItems.FindAsync(id);
    if (existing == null) return NotFound();

    existing.Title = item.Title;
    existing.Description = item.Description;
    existing.DueDate = item.DueDate;
    existing.Status = item.Status;
    existing.IsCompleted = item.IsCompleted;

    await _context.SaveChangesAsync();
    return NoContent();
}


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
