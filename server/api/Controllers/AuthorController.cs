using dataaccess;
using Microsoft.AspNetCore.Mvc;
using services.Abstractions;
using services.DTOs.Response;
using services.DTOs.Request;

namespace api.Controllers;

public partial class AuthorController(IService<BaseAuthorResponse, CreateAuthorDto, UpdateAuthorDto> authorService) : ControllerBase
{
    [HttpGet(nameof(GetAuthors))]
    public async Task<List<BaseAuthorResponse>> GetAuthors()
    {
        return await authorService.Get();
    }
    
    [HttpGet(nameof(GetAuthor))]
    public async Task<BaseAuthorResponse> GetAuthor(string id)
    {
        return await authorService.Get(id);
    }
    
    [HttpPost(nameof(CreateAuthor))]
    public async Task<BaseAuthorResponse> CreateAuthor([FromBody] CreateAuthorDto dto)
    {
        return await authorService.Create(dto);
    }
    
    [HttpPut(nameof(UpdateAuthor))]
    public async Task<BaseAuthorResponse> UpdateAuthor([FromBody] UpdateAuthorDto dto)
    {
        return await authorService.Update(dto);
    }
    
    [HttpDelete(nameof(DeleteAuthor))]
    public async Task<BaseAuthorResponse> DeleteAuthor([FromBody] string id)
    {
        return await authorService.Delete(id);
    }
}