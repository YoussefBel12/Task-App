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
    public class GetAllAppTasksQueryHandler : IRequestHandler<GetAllAppTasksQuery, List<AppTaskDto>>
    {
        private readonly IAppTaskRepository _taskRepository;

        public GetAllAppTasksQueryHandler(IAppTaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        public async Task<List<AppTaskDto>> Handle(GetAllAppTasksQuery request, CancellationToken cancellationToken)
        {
            return await _taskRepository.GetAllTasksAsync();
        }
    }
}
