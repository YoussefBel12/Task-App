using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task.Application.DTOs;

namespace Task.Application.Interfaces
{
   public interface IAppTaskRepository
    {
        Task<List<AppTaskDto>> GetAllTasksAsync();
        Task<AppTaskDto?> GetTaskByIdAsync(int appTaskId);
        Task<int> CreateTaskAsync(AppTaskDto appTaskDto);
        Task<bool> UpdateTaskAsync(AppTaskDto appTaskDto);
        Task<bool> DeleteTaskAsync(int appTaskId);

    }
}
