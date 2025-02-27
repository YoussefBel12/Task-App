using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Task.Application.DTOs;
using Task.Application.Interfaces;

namespace Task.Application.Queries
{
    public class GetAppTaskByIdQueryHandler : IRequestHandler<GetAppTaskByIdQuery, AppTaskDto?>
    {
        private readonly IAppTaskRepository _taskRepository;

        public GetAppTaskByIdQueryHandler(IAppTaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<AppTaskDto?> Handle(GetAppTaskByIdQuery request, CancellationToken cancellationToken)
        {
            return await _taskRepository.GetTaskByIdAsync(request.AppTaskId);
        }
    }
}
