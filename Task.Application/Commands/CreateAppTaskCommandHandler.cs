using MediatR;
using Task.Application.Interfaces;
using Task.Application.Validators;
using FluentValidation.Results; // Add this for validation results
using Task.Application.DTOs;
using FluentValidation;


namespace Task.Application.Commands
{
    public class CreateAppTaskCommandHandler : IRequestHandler<CreateAppTaskCommand, int>
    {
        private readonly IAppTaskRepository _taskRepository;
        private readonly AppTaskValidator _taskValidator;

        public CreateAppTaskCommandHandler(IAppTaskRepository taskRepository, AppTaskValidator taskValidator)
        {
            _taskRepository = taskRepository;
            _taskValidator = taskValidator;
        }

        public async Task<int> Handle(CreateAppTaskCommand request, CancellationToken cancellationToken)
        {
            // Validate the AppTaskDto
            ValidationResult validationResult = await _taskValidator.ValidateAsync(request.AppTaskDto, cancellationToken);

            if (!validationResult.IsValid)
            {
                // Validation failed, throw a ValidationException with errors
                throw new ValidationException(validationResult.Errors);
            }


            // If valid, proceed to create the task
            return await _taskRepository.CreateTaskAsync(request.AppTaskDto);
        }
    }
}
