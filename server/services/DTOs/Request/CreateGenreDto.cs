using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record CreateGenreDto
{
    [MinLength(1)] public string Name { get; set; } = null!;
}