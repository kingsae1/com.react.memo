## com.react.memoapp
- React를 이용한 메모어플리케이션 개발

## Requirement
- Build : node 10.2.1 버전
- Main Framework : Vue 3.8.2 버전
- State 관리 : Vuex 3.1.1 버전
- 통신 모듈 : Axios 0.19.0 버전
- D&C에서 제공되는 서버이용
    - https://github.com/dramancompany/memoapp-api
    - 기본적으로 3000포트를 이용해서 개발된다고 가정  

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```
### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

## Structure
> 기본 구조는 React Component Base구조로 설계되었다. 

## Define Components
> 모든 컴포넌트는 Vuex의 State 를 통해 상태값을 로드하며, 컴포넌트간의 간략한 데이터전송은 Props를 통해 부모에서 자식으로 전달한다

- View : 이벤트나 서비스로직은 View에서 컨트롤한다
- Component : 재사용성이 용이하도록 Component형태로 작게 설계하여 View에서 사용한다. Component는 Component의 합집합일 수도 있다.


### ROOT

- 가장 처음 진입하는 Starting Point 로 Redux Store 설정, `APP` Component 라우팅을 책임진다.
    - 미구현된 사항
        1. 라우터를 통해 페이지 히스토리 가능하도록 설계  

### APP

- Root 에서 처음으로 Rendering 하는 View 로 MainView를 라우터에 의해 로드하도록한다. MainView 는 LabelListView, LabelMemoListView, MemoView 가 존재한다
 
### LabelListView

- 맨 왼쪽 라벨리스트를 관리하는 View이다. 리스트의 컴포넌트인 ListComponent,AddButtonComponent 를 이용하여 View를 구성한다

### LabelMemoListView

- 라벨에 해당하는 간략한 메모리스트들을 나타내는 View로써, LabelListView와 비슷하게 ListComponent, ButtonComponent로 구성되어있다

### MemoView

- 메모를 작성하거나 이미 작성되어있는 메모를 로드하여 View에 나타내도록 한다. 

## Vuex
>컴포넌트간의 데이터 (상태)값을 전달하기 위해 존재

### State
- 전반적으로 컴포넌트들의 상태 참조값

### Getters
- State값의 조합을 Getter를 통해 참조

### Mutations
- 동기적으로 상태값을 변경

### Actions
- 비동기적으로 상태값 변경
- 기본적으로 Mutations을 이용해 비동기적으로 호출받아 동기적인 서비스로직 처리는 Mutation에서 처리

