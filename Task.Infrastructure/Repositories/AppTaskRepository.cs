using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Task.Application.DTOs;
using Task.Application.Interfaces;
using Task.Infrastructure.Data;

namespace Task.Infrastructure.Repositories
{
    public class AppTaskRepository : IAppTaskRepository
    {

        private readonly TaskDbContext _context;
        private readonly IMapper _mapper;

        public AppTaskRepository(TaskDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<AppTaskDto>> GetAllTasksAsync()
        {
            var tasks = await _context.AppTasks.ToListAsync();
            return _mapper.Map<List<AppTaskDto>>(tasks);
        }

        public async Task<AppTaskDto?> GetTaskByIdAsync(int appTaskId)
        {
            var task = await _context.AppTasks.FindAsync(appTaskId);
            return task == null ? null : _mapper.Map<AppTaskDto>(task);
        }

        public async Task<int> CreateTaskAsync(AppTaskDto taskDto)
        {
            var task = _mapper.Map<Domain.Entities.AppTask>(taskDto);
            _context.AppTasks.Add(task);
            await _context.SaveChangesAsync();
            return task.AppTaskID;
        }

        public async Task<bool> UpdateTaskAsync(AppTaskDto taskDto)
        {
            var task = await _context.AppTasks.FindAsync(taskDto.AppTaskID);
            if (task == null)
                return false;

            _mapper.Map(taskDto, task);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int appTaskId)
        {
            var task = await _context.AppTasks.FindAsync(appTaskId);
            if (task == null)
                return false;

            _context.AppTasks.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
