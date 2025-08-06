namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; } = string.Empty;

        public DateTime? DueDate { get; set; }

        public bool IsCompleted { get; set; } = false;

        public string Status { get; set; } = "todo"; // mới: trạng thái công việc

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
