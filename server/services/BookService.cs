using api.Controllers;
using services.Abstractions;

namespace services;

public class BookService : IService<BaseBookRequest, BaseBookResponse>
{
    public List<BaseBookResponse> Get()
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Get(string id)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Create(BaseBookRequest request)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Update(BaseBookRequest request)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Delete(BaseBookRequest request)
    {
        throw new NotImplementedException();
    }

    public BaseBookResponse Delete(string id)
    {
        throw new NotImplementedException();
    }
}