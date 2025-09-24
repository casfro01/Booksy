using System.ComponentModel.DataAnnotations;

namespace services.DTOs.Request;

public record UpdateAuthorDto
{
    [MinLength(2)][Required]public string Id { get; set; } = null!;
    [MinLength(1)][Required]public string Name { get; set; } = null!;
}