

class Node {
  child: Node | null = null
  prev: Node | null = null
  next: Node | null = null
  value: number;
  constructor(_value: number) {
    this.value = _value
  }
}

class LinkedList {
  head: Node;
  tail: Node | null = null
  constructor(_head: Node) {
    this.head = _head;
  }
  getTabs = (nesting: number) => {
    let s = ''
    for (let i = 0; i < nesting; i++) {
      // s+='↠'
    }
    return s + ''
  }

  print = () => {
    const data = transverse(this.head)
    const data2 = transverse2(this.head)
    console.log(JSON.stringify(data, null, 2))
    console.log(JSON.stringify(data2, null, 2))
  }
}

const transverse = (start: Node, arr?: Array<any>) => {
  let node: Node | null = start
  let s = ''
  if (!arr) arr = []
  while (node) {
    s = s += `(${node.value})`
    arr.push(s)
    if (node.child) {
      transverse(node.child, arr)
    }
    node = node.next
  }
  return arr
}

const transverse2 = (start: Node, arr?: Array<any>) => {
  let node: Node | null = start
  if (!arr) arr = []
  let s = ''

  while (node) {
    if (node.child) {
      arr.push(s)
      // transverse2(node)
    }
    if (node.next) { }
    node = node.next
  }
  return arr
}

const build = () => {
  const head = new Node(1)
  const list = new LinkedList(head)
  head.child = new Node(6)
  head.child.next = new Node(7)
  head.child.next.child = new Node(9)
  head.child.next.child.next = new Node(10)
  head.next = new Node(2)
  head.next.next = new Node(3)
  head.next.next.next = new Node(4)
  head.next.next.next.next = new Node(5)
  head.next.next.next.next.child = new Node(8)

  list.tail = head.next.next.next.next.child
  return list
}

const a = build()

function flattern(node: Node | null, next: Node | null): Node {
  const head = node as Node
  let prev
  while (node) {
    prev = node // 1
    if (node.child) {
      const current = flattern(node.child, node.next) // flattern(6)
      node.child = null // 
      prev.next = current || next
    }
    node = node.next
  }
  if (next) (prev as Node).next = next
  return head
}

function transverse3(head: Node): Array<Array | number> {
  let current = head
  let arr = []
  while (current) {
    arr.push(current.value)
    if (current.child) {
      arr.push(transverse3(current.child))
    }
    current = current.next
  }
  return arr
}

a.print()

console.log(transverse3(a.head))
flattern(a.head)
console.log(transverse3(a.head))