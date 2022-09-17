# apiHana


Example Post:
```py
    data = 'input str'
    res = requests.post('http://localhost:3000/decode',data={'data':data'}).json()
```
Response for Api :
```py
  # type for response data is a list misson 
  # success
  { "success:": true, data:data }
  # failed decode
  { "success:": false, data: null }
  

```
