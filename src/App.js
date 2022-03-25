import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){ 
  return <header> 
      <h1><a href="/"  onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
}
function Nav(props){
  const lis = [
  ]

  for(let i = 0; i<props.topics.length; i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={function(event){
                                        // onClick={(event)=>{블라블라~~}} 로 축약가능(에로우펑션)
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }

  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function App() {
  const [mode, setMode] = useState('Welcome')
  const [li, setLi] = useState(null)
  
  const topics = [
    {id: 1, title: 'html', body: 'html is ...'},
    {id: 2, title: 'Csss', body: 'Csss is ...'},
    {id: 3, title: 'Javascript', body: 'javascript is ...'}
  ]

  let content = null;
  if(mode === 'Welcome'){
    content = <Article  title="Welcome" body="hello, Web"></Article>
  }else if(mode === 'Read'){
    content =  <Article title={topics[li].title} body={topics[li].body}></Article>  
  }

  return (
    <div>
      <Header title="sample" onChangeMode={function(){
      }}></Header>
      <Nav topics={topics} onChangeMode={function(id){
        setMode('Read')
        setLi(topics[id-1].id-1)
      }}> </Nav>
      {content}
    </div>
  );
}
export default App;
