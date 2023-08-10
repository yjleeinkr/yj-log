미루고 미뤄왔던.. 마음 한켠에 찝찝하게 남아있던 Map과 Set을 회사 OJT를 하다가 마주치게 되어 공부를 하게 되었다. 배열과 객체보단 자주 쓰는 개념이 아니라 까먹기 전에 간단한 예제코드와 함께 블로그에 정리해본다.

# `Map` & `Set`

- 객체 : 키가 있는 컬렉션을 저장
- 배열 : 순서(인덱스)가 있는 컬렉션을 저장

✨ 이 두 자료구조만으로는 부족한 부분이 있어 `Map`과 `Set`이 등장했다. ✨

# 1. Map

키가 있는 데이터를 저장한다는 점에서 객체와 유사하다.

하지만 객체의 키는 무조건 `string`이지만 `Map`~~의 키는 다양한 자료형을 허용한다!~~

## Map 객체 생성

Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다.

```jsx
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
console.log(map); // Map(2) {'key1' => 'value1', 'key2' => 'value2'}

// ⭐️ Map 객체는 중복된 키를 갖는 요소가 있다면 덮어씌운다.
const map1 = new Map([
  ['key1', 'value1'],
  ['key1', 'value2'],
]);
console.log(map1); // Map(1) { 'key1' => 'value2' }
```

## Map의 프로퍼티/메소드

1. `size` : 요소 개수 확인

```jsx
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
console.log(map.size); // 2
```

2. `set(key,value)` : 요소 추가

```jsx
const map = new Map();

map //
  .set('key1', 'value1')
  .set('key2', 'value2');

console.log(map); // Map(2) {'key1' => 'value1', 'key2' => 'value2'}

// 키 값에 객체를 넣는다면?
const orderQtyMap = new Map();
const coffee = { name: '커피' };
const latte = { name: '라떼' };

orderQtyMap.set(coffee, 10).set(latte, 5);
console.log(orderQtyMap);
// Map(2) { { name: '커피' } => 10, { name: '라떼' } => 5 }
```

3. `get(key)` : key 값으로 요소 가져오기
4. `has(key)` : key 값으로 요소 존재 여부 확인 (boolean)

```jsx
console.log(orderQtyMap.get(coffee)); // 10
// 이 때, map.get({ name: '커피' })로 요소를 찾으려고 하면 undefined가 나온다.
// 왜냐하면 객체는 같은 속성으로 저장했더라도 다른 참조값을 가져서 {} !== {} 이기 때문
console.log(orderQtyMap.has(juice)); // false
console.log(orderQtyMap.has(latte)); // true
```

5. `delete(key)` : key 값으로 요소 삭제
6. `clear()` : 일괄 삭제하기

```jsx
map.delete(coffee); // 삭제되었으면 true 아니면 false
// Map(1) { { name: '라떼' } => 5 }
map.clear(); // Map(0) {size: 0}
```

## Map 요소에 반복 작업!

이터러블이기 때문에 가능한 부분

- `map.keys()` : 각 요소의 키를 모은 이터러블 객체를 반환
- `map.values()` : 각 요소의 값을 모은 이터러블 객체 반환
- `map.entries()` : 키, 값을 한 쌍으로 하는 이터러블 객체 반환

### `for … of` 로 순회해보기

```jsx
const visitorCountMap = new Map([
  [{ age: '20s' }, 300],
  [{ age: '30s' }, 500],
  [{ age: '40s' }, 400],
]);

// 키를 대상으로 순회
for (let visitor of visitorCountMap.keys()) {
  console.log(visitor); // {age: '20s'} {age: '30s'} {age: '40s'}
}

// 값을 대상으로 순회
for (let count of visitorCountMap.values()) {
  console.log(count); // 300 500 400
}

// [키, 값] 대상으로 순회
// for (let entry of visitorCountMap.entries()) {} 와 같음
for (let entry of visitorCountMap) {
  console.log(entry);
  // [{ age: '20s' }, 300] [{ age: '30s' }, 500] [{ age: '40s' }, 400]
}
```

### `forEach()` 로 순회해보기

`value`, `key`, `map` 순으로 인자를 가져올 수 있다.

```jsx
visitorCountMap.forEach((v, k, map) => console.log('value:', v, 'key:', k, 'map:', map));
```

### spead syntax 사용 및 destructuring 가능

```jsx
console.log([...map]);
// [ [ { name: 'Lee' }, '이씨' ], [ { name: 'Kim' }, '김씨' ] ]

const [lee, kim] = map;
console.log('lee:', lee); // lee: [ { name: 'Lee' }, '이씨' ]
console.log('kim:', kim); // kim: [ { name: 'Kim' }, '김씨' ]
```

## 객체를 맵으로 / 맵을 객체로!

### 1. 객체를 맵으로 변환

객체를 키-값 쌍([key, value])의 배열을 반환하는 `Object.entries()` 를 사용하면 된다. (이중배열)

```jsx
const person = { name: 'lee', size: 230 };

const personMap = new Map(Object.entries(person));
// Object.entries(person)는 [['name', 'lee'], ['size', 230]] 이중배열이 됨
console.log(personMap); // Map(2) {'name' => 'lee', 'size' => 230}
```

### 2. 맵을 객체로 변환

이중 배열 entries를 객체로 변환해주는 `Object.fromEntries()` 를 사용하면 된다.

```jsx
const personFromMap = Object.fromEntries(personMap.entries());
// Object.fromEntries(personMap) 해도 됨
console.log(personFromMap); // {name: 'lee', size: 230}
```

---

# 2. Set

배열과 유사해보이지만 아래처럼 은근히 중요한 부분에서 다른점이 많다.

1. 중복된 값 포함 X
2. 요소 순서에 의미 X
3. 인덱스로 요소에 접근 X

## Set 객체 생성

```jsx
cosnt set = new Set([1, 2, 3, 3]);
console.log(set) // Set(3) {1, 2, 3} 중복된 3이 제거됐다!

const set2 = new Set('hello')
console.log(set2) // Set(4) { 'h', 'e', 'l', 'o' } 중복된 l이 제거됐다!
```

🔥 ~~**중복된 요소 제거하는데 매우 유용하다**~~

```jsx
// 배열 메소드 filter, indexOf 활용 시
function deleteSame(arr) {
  return arr.filter((v, i, self) => self.indexOf(v) === i);
}

console.log(deleteSame([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]

// ✨ Set 활용
function deleteSameWithSet(arr) {
  return [...new Set(arr)];
}

console.log(deleteSameWithSet([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```

## Set의 프로퍼티/메소드

1. `size` : 요소 개수 확인 (중복 요소를 제거한 후 개수를 알려줌)

```jsx
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

2. `add()`: 요소 추가

```jsx
const set = new Set();
set.add(1).add(2);

console.log(set); // Set(2) { 1,2 }
```

3. `has()` : 요소 존재 여부 확인

```jsx
const set4 = new Set([1, 2, 3]);
console.log(set4.has(1)); // true
console.log(set4.has(4)); // false
```

4. `delete()` : 요소 일부 삭제

배열처럼 인덱스로 삭제하지 않고, ~~요소 자체를 넣어서 삭제~~한다.

5. `clear()` : 요소 전체 삭제

```jsx
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.delete(3)); // true 삭제 됐으면 true, 아니면 false
console.log(set); // Set(4) {1, 2, 4, 5}

set.clear();
console.log(set); // Set(0) {size: 0}
```

## Set 요소에 반복 작업

### `forEach()` & `for...of` : 요소 순회

`Set`에는 배열에 있는 index 개념이 없어서 Set.forEach(value, key, setSelf) 가 아니라 `Set.forEach(value, value2, setSelf)` 로 두번째 인자로 인덱스(key) 대신 첫번째 인자와 같은 값이 들어간다.

> 👉 이렇게 구현된 이유는 ?
>
> `Map`과의 호환성 때문이다. Map의 forEach에 쓰인 콜백이 세 개의 인수를 받을 때를 위해서인데, 이로 인해서 Map을 Set으로 Set을 Map으로 교체하기가 쉽다고 한다.

```jsx
const set = new Set(['a', 'b', 'c']);
set.forEach((v, v2, self) => console.log(v, v2, self));
/*
	a a Set(3) {'a', 'b', 'c'}
	b b Set(3) {'a', 'b', 'c'}
	c c Set(3) {'a', 'b', 'c'}
*/

for (const value of set) {
  console.log(value);
}
// 1 2 3
```

### spead syntax 사용 및 destructuring 가능

```jsx
const [a, ...rest] = set;
console.log(a, rest); // 'a', ['b', 'c']
```

## `Set` 객체로 집합 구현

🔥 `Set` 객체는 수학적 집합을 구현하기 위한 자료구조로 주로 쓴다.

### 교집합

서로 다른 `Set` 객체 간의 공통된 요소 찾기

```jsx
// 교집합 1
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    // 여기서의 this 는 이후에 intersection 메소드를 호출하는 객체가 된다!
    if (this.has(value)) result.add(value);
  }
  return result;
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // Set(2) {2, 4}
console.log(setB.intersection(setA)); // Set(2) {2, 4}

// 교집합 2
Set.prototype.intersection2 = function (set) {
  return new Set([...this].filter(v => set.has(v)));
};
/*
	여기서 spread syntax를 써준 이유는
	set은 유사배열객체이기 때문에 배열 메소드인 filter를 써주지 못하기 때문 
*/

console.log(setA.intersection2(setB)); // Set(2) { 2, 4 }
console.log(setB.intersection2(setA)); // Set(2) { 2, 4 }
```

### 합집합

서로 다른 `Set` 합치기

```jsx
// 합집합 1
Set.prototype.union = function (set) {
  const result = new Set(this); // 여기서 this는 union을 호출하는 객체

  for (const value of set) {
    result.add(value);
  }

  return result; // 어차피 set은 중복 요소를 제거해주기 때문에 중복 요소를 제거해주는 과정이 없어도 된다.
};

console.log(setA.union(setB)); // Set(2) { 1, 2, 3, 4 }
console.log(setB.union(setA)); // Set(2) { 2, 4, 1, 3 }

// 합집합 2
Set.prototype.union2 = function (set) {
  return new Set([...this, ...set]);
};

console.log(setA.union2(setB)); // Set(4) { 1, 2, 3, 4 }
console.log(setB.union2(setA)); // Set(4) { 2, 4, 1, 3 }
```

### 차집합

서로 다른 `Set` 간에 같은 요소를 제외한 다른 요소만 추출하기

```jsx
// 차집합 1
Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }

  return result;
};

console.log(setA.difference(setB)); // Set(2) { 1, 3 }
console.log(setB.difference(setA)); // Set(0) {}

// 차집합 2
Set.prototype.difference2 = function (set) {
  return new Set([...this].filter(v => !set.has(v)));
};

console.log(setA.difference2(setB)); // Set(2) { 1, 3 }
console.log(setB.difference2(setA)); // Set(0) {}
```

### 부분집합, 상위집합

```jsx
// 부분집합, 상위집합 1
Set.prototype.isSuperset = function (subset) {
  for (const value of subset) {
    if (!this.has(value)) return false;
  }
  return true;
};

console.log(setA.isSuperset(setB)); // true (A > B)
console.log(setB.isSuperset(setA)); // false (B < A)

// 부분집합, 상위집합 2
Set.prototype.isSuperset2 = function (subset) {
  const superset = [...this];
  return [...subset].every(v => superset.include(v));
};

console.log(setA.isSuperset2(setB)); // true (A > B)
console.log(setB.isSuperset2(setA)); // false (B < A)
```

###

이상 기본적인 `Map`과 `Set`의 기본적인 문법에 대해서 공부하고 정리해보았다.

키값에 문자가 아닌 객체가 들어가서 데이터를 좀 더 구체화해서 보여주고 싶을땐 `Map`을 쓰고, 중복된 요소가 없어야 하는 배열이 필요한 경우 배열 대신 `Set`을 써보는 연습을 해보면 좋겠다.
이외에도 어떻게 구체적으로 실무에 쓰이는지는 발견하거나 내가 쓰는 사례가 생긴다면 다시 정리해보겠다.
