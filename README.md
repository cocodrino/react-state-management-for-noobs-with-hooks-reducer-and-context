

# MANEJAR ESTADOS CON REACT/HOOKS/CONTEXT y REDUCERS!!! (para iniciados en react)
### Tutorial creado para los estudiantes de geeksacademy venezuela


Este es  tutorial donde voy a mostrar conceptos nuevos para que manejen estados usando hooks/context; por qué usar esta combinación?...Porque es el futuro de react, es lo más nuevo y que viene a simplificar y a hacer la vida más sencilla, pero requiere aprender unos conceptos nuevos, si manejan estos conceptos no solo van a poder usar hooks/context sino que van a poder crear aplicaciones complejas, van a poder solucionar cualquier problema que se les presente con el manejo de estados y son conceptos generales dentro de la comunidad de React

## Que es manejar estado?...
Casi toda aplicación necesita guardar valores, datos, en memoria para mostrarlos y procesarlos, por ejemplo si tenemos un contador, necesitamos guardar el valor actual, asi si le damos click a aumentar 1 ese ESTADO cambia y se le agrega el valor, igual para guardar usuarios, token, artículos y todo lo que se puedan imaginar

**ENTENDER CÓMO MODELAR EL ESTADO Y CÓMO ESTE VA CAMBIANDO EN LA APLICACIÓN ES LA BASE DE CUALQUIER APLICACIÓN EN REACT Y SI LO HACEN CORRECTAMENTE PUEDEN ESTRUCTURAR CUALQUIER APLICACIÓN**

# NOTA IMPORTANTE:
Van a notar cómo vamos complicando los ejemplos y los conceptos cada vez más, es importante que entiendan el concepto previo y que entiendan que si "se hace algo que complica el código" es porque al final esto permite o una mejor estructura de código o un mejor modelado, lo que les va a simplificar el trabajo tanto para crear sus estados como también para poder encontrar errores o entender qué sucede al momento de un error... 

## Que son hooks?
En react tenemos dos formas de crear componentes, uno es componentes de estado, donde usamos clases, el otro es componente de función. Hasta el momento si necesitabamos guardar un estado lo hacíamos usando un componente de estado, no podíamos usar un componente de función para esto...No obstante en la última versión de react tenemos hooks, que nos permiten, dentro de una función, guardar un estado **Importante: este estado es solo accesible al componente, no podemos compartirlo entre varios componentes**

observen el código [aqui](https://codepen.io/flaviocopes/pen/maVPKa)

tenemos un componente de función que se llama Count, el cual tiene un estado interno iniciado en 0...es decir, es un contador, cuyo estado es 0 y que cuando presionemos un boton el número va a ir en aumento

```js
const [count, setCount] = useState(0)
```

#### Repaso de destructuring!
Si no entienden el código de arriba, basicamente dice que useState es una función que me retorna un arreglo con dos elementos...el primer elemento es el estado en cuestión (lo asignamos a la variable count) el segundo elemento lo llamamos setCount y es el que nos va a permitir cambiar el estado, RECUERDEN: podemos usar indistintamente const,let,var...aunque siempre es preferible ir en ese orden, si es posible (si el valor no cambia) usar const...sino let, sino var

```js

// cuando tenemos 
let a = 10
podemos verlo como que le asignamos a "a" el valor de 10...pero tambien como que tratamos de hacer equivalente el valor del lado izquierdo "a" con el del derecho "10"...para que sea equivalente a tiene que valer 10
a = 10 

ahora...que pasa si colocamos del lado izquierdo las variables del lado izquierdo en una estructura (arreglo [] u objeto {}) como hicimos con el ejemplo de useState arriba?

otra vez JS va a intentar que el lado izquierdo haga match **lo mas posible** o sea equivalente al lado derecho
let [a,b] = [1,2]

para que sea equivalente "a" tiene que valer 1 y "b" tiene que valer 2...si eso ocurre 
[a,b] = [1,2]
a=1,b=2
[1,2] = [1,2]
por ende, le asigna el valor de 1 a "a" y el valor de "2" a b

eso es igual a hacer
let arreglo = [1,2]
let a = arreglo[0] //0 es la posición, el primer elemento de arreglo
let b= arreglo[1]

no obstante acá usamos más pasos y es menos flexible

JS siempre va a tratar de hacer que en lo más posible haga match el lado izquierdo con el derecho, por ej
let [primero] = [2,3]

JS ve que del lado izquierdo tiene un arreglo donde el primer valor "primero" debe coincidir con el primer valor del lado derecho "2"...todo lo demás no importa, por lo que omite el 3

let [primero,segundo,tercero] = [1,2]
primero es 1
segundo es 2
tercero es undefined porque no hay tercer elemento del lado derecho

otra cosa que podemos hacer es usar el **SPREAD OPERATOR** para decirle algo asi como "todo lo demás"

let [primero,...resto] = [1,2,3,4,5]
primero es 1
resto es "todo lo demás" es decir [2,3,4,5]

PERO DESTRUCTURING NO SOLO SIRVE CON ARREGLOS, TAMBIEN CON OBJETOS

let usuario = {nombre:"tom", edad:20,profesion:"developer"};

function saludar(userObj){
  //acá hago destructuring, para que el lado izquierdo coincida lo mas posible con el lado derecho de la igualdad, nombre debe valer "tom" es decir...que a la variable nombre le asignamos el valor de "tom"
  let {nombre} = userObj;
  console.log("hola "+ nombre); 
}

saludar(usuario)

o mas avanzado, haciendo el destructuring en los argumentos de la función y usando funciones flecha...no se preocupen si no lo entienden, no es tan común hacer destructuring en los argumentos

var saludar= ({nombre}) => console.log("hola " + nombre)
//acá hago el destructuring en el argumento, estoy diciendole
con ({nombre}) =>  le estoy diciendo, vas a recibir un objeto con una propiedad nombre, asignale el valor que tenga alli ("tom") a una variable con el mismo valor (nombre) para usarla dentro de la función 

// OTRO EJEMPLO
function funcion1(){
	return ["Pedro",23]
}

//funcion1 retorna un arreglo donde el primer valor es un nombre y el segundo la edad
//yo puedo acceder a estos valores asi (OJO pueden usar var,let,const, es indiferente en este caso)
let usuario = funcion1() //usuario es todo el arreglo
let nombre = usuario[0] //accedemos al nombre y se lo asignamos a nombre
let age = usuario[1] //accedemos al segundo valor y se lo asignamos a la variable age

//EN JS MODERNO hay una forma más resumida de lograr esto y es con destructuring, destructuring compara el lado derecho de la igualdad con el lado izquierdo y trata que haga match, de modo que si tenemos variables del lado izquierdo el se las asigna


//usando la funcion1 sería
let [nombre,age] = funcion1()
//nombre es el elemento 0 en este caso Pedro




YA PUEDEN ENTENDER QUE HACE ESTE CÓDIGO?
const [count, setCount] = useState(0)

RECUERDEN!!! ustedes le pueden poner el nombre que quieran a sus variables, si las quieren llamar
const [estado, cambiarEstado] = useState(0)
const [miSuperContadorDeEjemplo, funcionQueUsoParaCambiarEstado] = useState(0)

igual va a funcionar siempre que usen esos nombres de variable en el resto de su código dentro de la función
```

Sigamos con el ejemplo, como el estado lo asignamos a count, ahora podemos dentro del return de la función hacer algo como esto
```js
<p>You clicked {count} times</p>
```
inicialmente count es 0 pero a medida que el contador sube el va a ir cambiando el valor

para modificar el valor hacemos
```js
 <button onClick={() => setCount(count + 1)}>
```

setCount nos permite cambiar el estado, asi si ponemos setCount(10) el nuevo estado (count) va a ser 10...si el estado es 0 y hacemos setCount(count + 1) el nuevo estado va a ser 0+1=1 con el boton incrementamos el estado +1 siempre.... :D



## Reducer
Vamos a "complicar" un poco más el código, como les dije anteriormente, de principio va a parecerles que es una complicación innecesaria, no obstante, cuando la aplicación va creciendo y los estados son cada vez más complejos, el usar reducer resulta una mejor herramienta, dado que va a hacer **mas predecible y más lógico** entender como cambia el estado en nuestra app (y recuerden esta es la base para usar react como pro's)

** ES BUENO ENTENDER COMO FUNCIONAN LOS REDUCER PORQUE REDUX ES LA LIBRERÍA MÁS POPULAR PARA MANEJAR ESTADOS EN REACT Y PRACTICAMENTE VAN A VER QUE TODO EL MUNDO LA USA, SI SABEN EL CONCEPTO VAN A ENTENDER LA LIBRERÍA, AUNQUE COMO LES DIJE, HOOKS CON REDUCER Y CONTEXT ES EL FUTURO DE REACT Y SIMPLIFICA EL CÓDIGO COMPARADO A USAR REDUX**



### Como empezar
Lo primero que vamos a hacer es modelar el estado de nuestra aplicación, por ejemplo, si vamos a necesitar guardar al usuario, debemos colocar una propiedad usuario dentro de nuestro estado....para este ejemplo voy a seguir la misma idea del contador, nuestro estado va a ser simplemente un count con el valor actual

LES CREÉ UN EJEMPLO QUE PUEDEN VER (AQUI)[https://codepen.io/CheWm/pen/ROzRjK]

```js
const initialState = {
  count: 1,
 
}

mi estado es simplemente un objeto y como propiedades todo lo que tenga que guardar
```

**ahora viene la parte compleja**

#### Que es un reducer y cómo funciona
Ahora no vamos a modificar el estado directamente, sino que vamos a **mandar un mensaje** diciendole a una función reductora que modifique el estado según el mensaje que le enviemos

asi...yo cuando le doy click al boton de aumentar va a enviar un mensaje
```
dispatch({asunto: 'INCREMENT'})
```
nuestra función reductora va a tener todos los posibles asuntos para manejar todo los posibles cambios (incrementar y resetear de momento) y ella va a saber que hacer dependiendo del mensaje

##### DOS COSAS IMPORTANTES DE LA FUNCION REDUCTORA
1) la funcion recibe dos parámetros, el primero es el estado actual de la aplicación, de modo que si dentro de la función yo coloco estado.count puedo ver el valor del contador en ese momento, el segundo argumento es el mensaje...cada vez que hago un dispatch, esta función se ejecuta y como mensaje voy a recibir el mensaje que le pasé en dispatch...

cuando la aplicación se inicia y le doy dispatch({asunto: 'INCREMENT'} el estado va a ser {count:0} y el mensaje va a ser {asunto: 'INCREMENT'}

2) la función reductora retorna un nuevo estado, esto es importante, el estado que retorne va a ser el nuevo estado de mi aplicación y debe ser un nuevo estado, no podemos modificar el estado anterior, debemos retornar uno nuevo, para entender mejor esto lean la nota que coloco abajo (retorno de nuevo estado)

```js
const reducer = (estado, mensaje) => {
  switch(mensaje.asunto) {
   //si el mensaje tiene como asunto INCREMENT retorna esto
    case 'INCREMENT':
      return {
        ...estado,
        count: estado.count + 1
      };
      break;
  
    case 'RESET':
      return {
        ...estado,
        count: 0
      };
      break;
    default:
      return state;
  }
}
```

#### RETORNO DE NUEVO ESTADO
Esta sintaxis puede resultarles un poco confusa
```js
{
        ...estado,
        count: estado.count + 1
      }
```

La base de esto es que debemos crear un nuevo objeto, con las propiedades del estado original y luego modificar lo que tengamos que modificar...veamos un ejemplo

```js
let usuario = {nombre: "mary", age:20}

supongamos que queremos aumentar la edad de usuario a 21
si hacemos usuario.age = 21 usuario va a ser

{nombre:  "mary", age:21}

eso funciona en JS, pero no en REACT, porque en react NO debemos modificar (mutar) un objeto directamente, en cambio, debemos crear un nuevo objeto, COPIANDO todas las propiedades del objeto original y solo modificando lo que deseamos

let nuevoUsuario = {...usuario, age:21}

que significa el ... aqui...basicamente le decimos, copia todas las propiedades de usuario, dentro de este objeto...y age sobreescribela con el valor de 21

TRUCO!!!
yo generalmente me imagino que los 3 puntos matan las llaves o el bracket, imagino que tacho los puntos y tacho las llaves del objeto interno...lo que basicamente significa, no tomes el arreglo o el objeto, sino solo los valores internos...quedando
                            ----usuario-------------           los ... eliminan los {} de usuario quedando  
{...usuario, age:21} => {...{nombre:  "mary", age:20},age:21} => {nombre:  "mary", age:20,age:21}

y como en un objeto no debe haber 2 propiedades repetidas, JS toma la última que definimos...age:21 quedando
let nuevoUsuario = {nombre:  "mary", age:21}

TODO ESTO PARECE MUY COMPLICADO, PERO IMAGINEN QUE TIENEN CIEN PROPIEDADES Y NO SOLO 2 COMO EL EJEMPLO, TAMBIEN ESTO FUNCIONA CON ARREGLOS

let usuario = {name: "jhon",color:"red", age:19,status:"inactive"}

si queremos cambiarle el estatus a activo a usuario, copiamos todas sus propiedades y le cambiamos el status
let usuario = {...usuario, status:"active"}

esto funciona tambien con arreglos
let arreglo1 = [1,2,3,4]
let arreglo2 = [20,...arreglo1]

que es arreglo 2???
imaginen de nuevo
[20,...arreglo2] == [20,...[1,2,3,4]] -- puntos matan [] -> [20,1,2,3,4]

que hicimos?...creamos un arreglo nuevo que es el arreglo1 pero insertandole un 20 al inicio
let arreglo3 = [...arreglo1,10]
asi lo insertamos al final

imaginen que quieren concatenar arreglo1 y [5,6,7,8]
cómo lo harían?

let arregloConcatenado = [...arreglo1, ...[5,6,7,8]]

los puntos matan los brackets de arreglo1 y del arreglo [5,6,7,8] quedandonos [1,2,3,4,5,6,7,8]

tengo dos objetos con propiedades diferentes y quiero unirlos
let ob1 = {color:"red",count:12}
let ob2 = {name:"lily",status:"active"}

let union = {...ob1, ...ob2} puntos matan los {} de ob1 y ob2
{...{color:"red",count:12},...{name:"lily",status:"active"}}

nos queda
{color:"red",count:12,name:"lily",status:"active"}

y asi unimos ambos objetos

RETORNANDO AL EJEMPLO
{...estado,count: estado.count + 1}

suponiendo que estado es {count:0}
{...{count:0},count: estado.count + 1}

puntos tachan llaves
{count:0,count: estado.count + 1}
{count:0, count:0+1}
{count:0,count:1}
como hay dos propiedades iguales se toma la última (de izquierda a derecha)
{count:1}

que complicado!...realmente no...es cuestión de entenderlo bien y entender que la sintaxis es muy flexible

// SUPONGAMOS QUE NUESTRO ESTADO ACTUAL ES ESTE
export const initState = {  
  username: "jhon",  
  token: "23242",  
  notes: [],  
  note: "",  
  error: null  
};

y queremos añadirle la nota "hacer tutorial" a la propiedad notes...cómo lo haríamos
{...initState, notes: [...initState.notes, "hacer tutorial"]}

con ...initState estamos copiando todas las propiedades de initState dentro de nuestro nuevo objeto, pero ahora notes lo estamos sobreescribiendo para que sea
[...initState.notes, "hacer tutorial"]
que signiica, dame un arreglo con todas las notas iniciales y agregale "hacer tutorial" al final

POR FAVOR, SE QUE PUEDE SER CONFUSO, LEAN MAS SOBRE ESTO PORQUE VAN A VERLO UTILIZADO EN TODOS LADOS




```
LES DEJO UN VIDEO PARA QUE ENTIENDAN MAS SOBRE EL SPREAD OPERATOR
https://www.youtube.com/watch?reload=9&v=gFvWNjVy-wc





#### Conectar la función reductora con nuestro componente
Una vez tenemos nuestro estado construido, nuestro reducer, solo queda usarlo dentro de react

```js
  const [{count} , dispatch] = useReducer(reducer, initialState);


```
useReducer es similar a useState que usamos en nuestro primer ejemplo, solo que ahora esta funcion recibe un reducer y un estado inicial...y me retorna un arreglo donde el primer elemento es el estado (y estoy haciendo destructuring para extraer count directamente) y el segundo elemento es el dispatch que voy a usar para enviarle mensajes al reducer

ahora...si yo hago esto
dispatch({asunto: 'INCREMENT'}

se va a ejecutar la función reducer, dependiendo del asunto va a ejecutar una accion...en este caso

```
 case 'INCREMENT':
      return {
        ...estado,
        count: estado.count + 1
      };
      break;
```

y listo!...con esto ya entendemos como usar reducer

#### POR QUÉ USAR REDUCER Y NO MODIFICAR EL ESTADO DIRECTAMENTE?
Todo esto parece más complicado....y se va a complicar más!!!...pero tiene un beneficio...con solo ver la función reducer ustedes saben que modificaciones recibe su estado, al centralizar todos los cambios de estado dentro de esa función, no les va a suceder que luego no saben por qué el estado cambio de tal forma...
otra cosa es que usamos dispatcher...

supongamos que durante un segundo se ejecutan 10 funciones que cambian el estado directamente (sin dispatch) y que el resultado no es el esperado...es dificil poder evaluar y ver en qué momento qué función no está funcionando...en vez que si usamos mensajes para cambiar nuestro estado, tenemos como una bitácora (veremos esto mas adelante) donde podemos ver qué mensaje se envió, cómo era el estado en ese momento y cómo quedó el estado...si bien todo esto puede parecer más complicado, lo más complicado en una app con react es resolver problemas de estado y cosas que no salen como esperamos...y con esto se nos simplifica la tarea

### ESTADO GLOBAL CON CONTEXT
Hasta ahora hemos usado hooks, pero tenemos una limitación, el estado que creamos solo es visible dentro de nuestro componente, si queremos que varios componentes accedan a nuestro estado y tener un estado centralizado, necesitamos un ingrediente adicional, eso lo conseguimos a través de contexto...

No voy a profundizar mucho en que es context, porque sino el tutorial va a ser infinito, pero les dejo los enlaces

https://www.youtube.com/watch?v=Y_zoptg1l2I
https://platzi.com/blog/tutorial-como-acceder-a-los-datos-de-tu-aplicacion-con-react-context-api/
https://www.youtube.com/watch?v=qSzmucGdFoY

En lineas generales nosotros creamos un contexto
```js
const AppContext = React.createContext();
```

luego a ese componente le pasamos un estado o un objeto que queremos que sea accesible a todos sus elementos hijos
```js
<AppContext.Provider value={{usuario:"mike",color:"red"}}> 
  <Componente1/>
  <Componente2>
    <ComponenteAnidado/>
  </Componente2/>
</AppContext.Provider>
```

ahora...todos los componentes dentro de AppContex, incluso el anidado, van a poder acceder al objeto que pasamos en el prop value {usuario:"mike", color:"red"}

```js
function ComponenteAnidado(){
  //podemos acceder a {usuario:"mike",color:"red"} en cualquier componente dentro de AppContext.Provider
  let contexto = useContext(AppContext)
 return( 
    <div>Hola {contexto.usuario}</div>

 )
}
```

#### Y como se relaciona contexto con hooks?
Si creamos un contexto y le pasamos nuestro estado y reducer  useReducer(reducer, initialState)...todos los componentes hijos van a poder acceder a ese estado y lo compartiremos para todos los componentes


Basado en el código en [este artículo](https://medium.com/simply/state-management-with-react-hooks-and-context-api-at-10-lines-of-code-baf6be8302c) 

crearemos un componente al que le pasaremos el estado, la funcion reductora y los middlewares (hablaré mas de esto en el punto de acciones) esto de usar middlewares se lo agregué yo al código original, para permitir usar react-thunk (como dije, hablaremos más adelante de esto, aunque no es 100% necesario)

Pueden copiarse este componente de [acá](https://github.com/cocodrino/react-state-management-for-noobs-with-hooks-reducer-and-context/blob/with-component/src/helperComponent/stateProvider.js)

Cómo usarlo pueden ver en el repositorio que les pasé,que solo necesitan crear un componente StateProvider, pasarle el estado inicial y la función reductora y ya todos los componentes que definamos adentro van a poder acceder y utilizar el estado, igual que cómo habíamos hecho, es decir, vamos a compartir un solo estado con todos los componentes

** El proyecto en el repositorio no contiene estilos actualmente, es solo un prototipo funcional, les estaré avisando una vez el repositorio esté totalmente finalizado**

Actualmente la aplicación te permite loguearte y registrarte, una vez te logueas ves tus notas y puedes crear nuevas notas, si accedes a las notas de otra persona pero no eres el dueño o ni siquera estás logueado la app te indica que no puedes crear nuevas notas, solo verlas


1) clonen el repositorio de [aqui](https://github.com/cocodrino/react-state-management-for-noobs-with-hooks-reducer-and-context) o descarguen el zip que les envié.
2) cambien a la rama **sample-without-thunk**, eso lo hacen escribiendo git branch full-sample-without-hooks en la terminal...tambien dentro del editor, en la esquina inferior derecha, justo a la izquierda de un candado abierto verán que dice GIT...dan click alli y les aparecen las ramas, dan click en la rama a la que quieren cambiar y luego marcan "Checkout As"

Dentro de index van a encontrar algo como esto

```js
ReactDOM.render(  
   <StateProvider initialState={initState} reducer={reducer} middlewares=  {middlewares}>  
  <>  
    <MyNav/>  
   <Router history={history}>  
   <Route exact path="/" component={Home}/>  
   <Route exact path="/login" component={Login}/>  
   <Route exact path="/registro" component={Register}/>  
   <Route path="/user/:user/notes" component={Notes}/>  
  
   </Router>  
  </>  
  
  </StateProvider>  
  , document.getElementById('root')  
)
```

MyNav, Login,Register,Notes, van a tener acceso al estado que yo le pase a **StateProvider initialState** 

Este componente adicionalmente acepta middlewares, eso es para usar thunks o logs aunque eso lo explicaré luego

Para acceder al estado pueden ver el archivo navbar.js 

```js
import {getState} from "../helperComponent/stateProvider";  
import {logout} from "../state";  
  
function SignComponente(){  
//importamos la función getState desde el mismo archivo donde está nuestro StateProvider y ya podemos acceder al estado normalmente
  const [state, dispatch] = getState();  
  
  // si hay token mostrar el NavLink para salir, sino mostrar los de registrarse o login  
  let component = state.token ?  
  <NavItem>  
 <NavLink onClick={() => dispatch(logout())}>Salir</NavLink>  
 </NavItem>  
  :  
  <NavItem>  
 <NavLink href="/registro">Registrarse</NavLink>  
 <NavLink href="/login">Login</NavLink>  
 </NavItem>;  
  
  return(  
  <>  
  {component}  
  </>  
  )
```

### REVISEMOS UN POCO LA LÓGICA
Ya que conocemos los conceptos, vamos a revisar un poco el código en los archivos, recuerden la rama es sample-without-thunk

esta sería la página de registro, la puedes encontrar en /pages/loginOrRegister.js

```js
export function Register(props) {  
  let username = React.createRef();  
  let password = React.createRef();  
  
  const [state, dispatch] = getState();  
  
  //si el usuario ya tiene token significa que está registrado, no tiene
  //nada que hacer dentro de la página de registro
  //se le redirige a su area usuario
  if (state.token) {  
  console.log("estado es\n" + state);  
  props.history.push(`/user/${state.userRegistered}/notes`);  
  }  
  
  const loginUser = (username, password) => {  
     console.log("haciendo login con " + username);  
     Axios.post("/auth/token/login", {username, password})  
     .then(response => {  
            console.log("response de login es \n" +  util.inspect(response));  
           let token = response.data.auth_token;  
           dispatch({type: "STORE_USER", username: username});  
           dispatch({type: "STORE_TOKEN", token, username});  
   })  
      .catch(response => {  
         console.log("error " + util.inspect(response));  
         dispatch({type: "STORE_ERROR", error: JSON.stringify(response.response.data)});  
         setTimeout(() => {  
           dispatch({type: "STORE_ERROR", error: null})  
         }, 3000)  
  
 }) };  
  
  let handleClick = () => {  
      let usernameValue = username.current.value;  
      let passwordValue = password.current.value;  
      Axios.post("/api/users/create/", {username: usernameValue, password: passwordValue})  
          .then(response => {  
             dispatch({type: "STORE_USER", username: response.data.username});  
  })  
          .then(() => loginUser(usernameValue, passwordValue))  
          .catch(response => {  
             console.log("error " + util.inspect(response));  
             dispatch({type: "STORE_ERROR", error: JSON.stringify(response.response.data)});  
             setTimeout(() => {  
               dispatch({type: "STORE_ERROR", error: null})  
           }, 3000)  
 })  
  
 };  
  
  let mensaje = "Por favor ingrese sus datos para el Registro";  
  
  return (  
    <div className="App-header">  
       <h2>{mensaje}</h2>  
       <input type="text" ref={username} placeholder="nombre de usuario"/>  
       <input type="password" ref={password} placeholder="password"/>  
       <Button size="lg" color="primary" onClick={handleClick}>OK</Button>  
    </div>  
 )}
```

lo primero que vemos es que creamos dos referencias, username y password, estas referencias se usan para asignarselas a inputs, luego en determinado momento, como por ejemplo al darle click a registrar, podemos dentro de nuestra función preguntarle, que valor tiene el input y obtener el texto que el usuario ingresó

```js
//aqui le asignamos la referencia a ese input para poder obtener los valores que el usuario ingreso
<input type="text" ref={username} placeholder="nombre de usuario"/>
```

```js
 let handleClick = () => {
 //aqui obtenemos el valor del input donde colocamos la referencia, accediendo al texto que colocó el usuario en username  
  let usernameValue = username.current.value;  
  ...
```

El usuario llena sus datos y presiona el boton, el boton ejecuta la función handleClick,alli extraemos el nombre de usuario y password que el usuario puso, a través de las referencias, luego enviamos esos datos a nuestra app en Django, si todo va bien guardamos el usuario en nuestro estado

```js
dispatch({type: "STORE_USER", username: response.data.username}); 
```

como bonus, una vez que te registras automáticamente te logea, de modo que llamamos a una función de login, que si todo va bien con nuestra app en Django, va a devolvernos un token y este a través del dispatch lo guardamos en el estado

Si algo falla, muestra el error, esto lo conseguimos guardando el error en el estado y luego de 3 segundos lo borramos...tenemos un componente en /componentes/aviso.js que si hay un mensaje de error lo muestra en pantalla...

```js
export default function Aviso(){  
  let [{error}] = getState();  
  
  let aviso = error ? <Alert color="danger"> {error} </Alert> : <></>;  
  
  return(  
  <>  
  {aviso}  
  </>  
  )  
}
```



### BONUS POINT: Compliquemoslo un poco más...usando acciones!!! (opcional)
Pueden ver en la rama que usando la misma lógica de login/registro podemos lograr que muestre las notas, agregar nuevas notas, etc....todo esto funciona, pero no es la manera más óptima, porque hay dos detalles.

1) Si hay varios componentes que necesitan ejecutar una misma acción, terminamos con código duplicado, un ejemplo es login, tanto el componente registro como el de login hacen el llamado a django para logearse, en este caso duplicamos la llamada a la api...igual pasa con el mostrar errores, tuvimos que copiar y pegar la lógica de mostrar el error 3 segundos...en cada llamada a la api...
2) Los componentes no deberían tener tanta lógica adentro, deberían ser solo para renderizar el estado, no para hacer llamados a api's...
3) Es más simple tener todas las llamadas a la api en un solo lugar, de modo que mejora nuestra organización 

podemos sacar las funciones de login y registro por ejemplo...y meterlas dentro de nuestro estado, pero esto va a traer un inconveniente: estas funciones llaman a un dispatcher y ese dispatcher es solo accesible dentro de nuestro componente función...si sacamos la función y la colocamos en nuestro state.js...JS no va a saber quién es nuestro dispatcher...

es por esto que se crearon los thunks, desgraciadamente no vienen integrados dentro de react ni redux, sino que son un middleware, un middleware es como una extensión que se conecta a tu reducer y le permite aprender nuevos trucos...

** REVISEN LA RAMA FULL-SAMPLE DONDE ESTÁ TODA LA IMPLEMENTACIÓN USANDO ACCIONES **

necesitamos instalar redux y redux-thunk e importar redux-thunk (ver archivo state.js)

yo instalé e importé otro middleware llamado redux-logger, pero realmente no es necesario

luego los exportamos
```js
export  const  middlewares  = [thunk, logger,myLogger];
```

para usarlos en nuestro index.js
```js 
//index.js
<StateProvider initialState={initState} reducer={reducer} middlewares={middlewares}>
```

ya con eso conectamos redux-thunk con nuestro estado y nuestro reducer...pero que hace esto?

bueno...ahora podemos sacar nuestras funciones, por ejemplo register y login y guardarlas dentro de nuestro state.js....de modo que si varios componentes necesitan acceder a ellas, simplemente con llamarlas puedenr realizarlo (usando p.e dispatch(funcionPrueba())

Hay otro detalle, debemos modificar nuestras funciones, de esto
```js
const loginUser = (username, password) => {
   console.log("haciendo login con " + username);
   Axios.post("/auth/token/login", {username, password})
    .then(response => {
       console.log("response de login es \n" + util.inspect(response));
       let token = response.data.auth_token;
       dispatch({type: "STORE_USER", username: username});
       dispatch({type: "STORE_TOKEN", token, username});
   })
...

```

a esto

```js
const loginUser = (username, password) => dispatch => {  
  console.log("haciendo login con " + username);  
  Axios.post("/auth/token/login", {username, password})  
     .then(response => {  
      console.log("response de login es \n" + util.inspect(response));  
     let token = response.data.auth_token;  
     dispatch({type: "STORE_USER", username: username});  
     dispatch({type: "STORE_TOKEN", token, username});  
  })  
  ...



```
fijense que ahora nuestra función retorna otra función, que recibe como argumento el dispatcher... y esa función si realiza las llamadas y ejecuta el dispatch

pueden verlo mejor usando la sintaxis tradiciona

```js
function loginUser(username,password){
  return function(dispatch){
    Axios.post(....)
  }
}
```

este patrón de función que retorna otra función que recibe un dispatch como argumento se llama acción dentro de la comunidad react/redux y es un patrón que debemos seguir si queremos tener los llamados a la api fuera de los componentes...

pueden ver en el archivo state.js que creo varias acciones, todas ellas son funciones que primero retornan una función con un argumento dispatch...y luego si va todo el contenido

```js
logout es una funcion que retorna otra función con un argumento dispatch
export const logout = () => dispatch => {  
  dispatch({type: "REMOVE_STORED_USER"})  
};

//equivalente a 
export const logout = () => {
 return (dispatch) => {  
  dispatch({type: "REMOVE_STORED_USER"})  
 }
}

//equivalente a
function logout(){
  return function(dispatch){
    dispatch({type: "REMOVE_STORED_USER"})  
  }
}
```

para llamar estas acciones lo hacemos a través del dispatcher dentro de nuestros componentes de función **NO SE LLAMA DIRECTAMENTE** ej
```js
let handleClick = () => {  
  console.log("username es " + username.current.value + " password " + password.current.value);  
  // ejecuto la accion loginUser a través del dispatch
  dispatch(loginUser(username.current.value,password.current.value));  
  // NO LLAMEN A LA ACCION DIRECTAMENTE 
  // ESTO NO loginUser(username.current.value,password.current.value)
  
};
```


por favor revisen la rama **full-sample** si quieren entender mejor el código


> Written with [StackEdit](https://stackedit.io/).
