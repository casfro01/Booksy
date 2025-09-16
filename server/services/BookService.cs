using api.Controllers;
using services.Abstractions;
using services.DTOs.Request;
using services.DTOs.Response;

namespace services;

public class BookService : IService<BaseBookResponse, CreateBookDto, UpdateBookDto>
{
    public List<BaseBookResponse> Get()
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Get(string id)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Create(CreateBookDto dto)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Update(UpdateBookDto dto)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Delete(string id)
    {
        throw new NotImplementedException();
    }
}