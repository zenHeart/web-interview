// 测试链表创建
exports.create = {
  单节点: {
    input: 1,
    expect: {
      val: 1,
      next: null
    }
  },
  多节点: {
    input: [1, 2, 3],
    expect: {
      val: 1,
      next: {
        val: 2,
        next: {
          val: 3,
          next: null
        }
      }
    }
  }
};

// 链表添加节点
exports.add = {
  空链表添加节点: {
    input: [null, { val: 1, next: null }],
    expect: { val: null, next: { val: 1, next: null } }
  },
  多个节点添加节点: {
    input: [[1, 2, 3], { val: 4, next: { val: 5, next: null } }],
    expect: {
      val: 1,
      next: {
        val: 2,
        next: { val: 3, next: { val: 4, next: { val: 5, next: null } } }
      }
    }
  }
};

// 根据值删除节点
exports.removeByVal = {
  单一节点头结点删除: {
    input: [1, 1],
    expect: { val: undefined, next: null }
  },
  多节点头节点删除: {
    input: [[1, 2, 3], 1],
    expect: {
      val: 2,
      next: {
        val: 3,
        next: null
      }
    }
  },
  多节点尾节点删除: {
    input: [[1, 2, 3], 3],
    expect: {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    }
  },
  多节点删除多个元素: {
    input: [[1, 2, 3, 2, 2, 5], 2],
    expect: {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 5,
          next: null
        }
      }
    }
  },
  多节点删除相同元素: {
    input: [[1, 1, 1, 1], 1],
    expect: {
      val: undefined,
      next: null
    }
  },
  多节点保留一个节点删除相同元素: {
    input: [[1, 1, 1, 2, 1], 1],
    expect: {
      val: 2,
      next: null
    }
  }
};

// 根据节点位置删除元素
exports.removeByNum = {
  单一节点头结点删除: {
    input: [1, 1],
    expect: { val: undefined, next: null }
  },
  多节点头节点删除: {
    input: [[1, 2, 3], 1],
    expect: {
      val: 2,
      next: {
        val: 3,
        next: null
      }
    }
  },
  多节点尾节点删除: {
    input: [[1, 2, 3], 3],
    expect: {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    }
  },
  多节点中间节点删除: {
    input: [[1, 2, 3, 4], 2],
    expect: {
      val: 1,
      next: {
        val: 3,
        next: {
          val: 4,
          next: null
        }
      }
    }
  }
};

// 测试循环链表

let cycle = {
  没有循环: {
    input: {
      val: 1,
      next: null
    },
    expectHasCycle: false,
    expectPos: null
  },
  单节点循环: {
    input: {
      val: 1,
      next: null
    },
    expectHasCycle: true,
    expectPos: null
  },
  循环索引为0: {
    input: {
      val: 1,
      next: {
        val: 2,
        next: null
      }
    },
    expectHasCycle: true,
    expectPos: null
  },
  循环索引为1: {
    input: {
      val: 1,
      next: {
        val: 2,
        next: { val: 3, next: null }
      }
    },
    expectHasCycle: true,
    expectPos: null
  }
};
cycle['单节点循环'].input.next = cycle['单节点循环'].input;
cycle['单节点循环'].expectPos = cycle['单节点循环'].input;
cycle['循环索引为0'].input.next.next = cycle['循环索引为0'].input;
cycle['循环索引为0'].expectPos = cycle['循环索引为0'].input;
cycle['循环索引为1'].input.next.next.next = cycle['循环索引为1'].input.next;
cycle['循环索引为1'].expectPos = cycle['循环索引为1'].input.next;
exports.cycle = cycle;
console.log(cycle['单节点循环']);
