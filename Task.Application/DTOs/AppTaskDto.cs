using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Task.Application.DTOs
{
   public class AppTaskDto
    {
        [Key]
        public int AppTaskID { get; set; }

        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskStartDate { get; set; }
        public DateTime TaskEndDate { get; set; }
        public int TaskPriority { get; set; }
        public bool TaskStatus { get; set; }
    }
}
