import _ = require('lodash');
import Helper = require('../helper');
import User = require('./user');

export enum Type {
  CHANNEL,
  LOBBY,
  QUERY
}

let id = 1;
const config = Helper.getConfig();

export class Chan {
  public id: number;

  constructor(
    public messages: string[] = [],
    public name: string = '',
    public topic: string = '',
    public type: Type = Type.CHANNEL,
    public unread: number = 0,
    public highlight: boolean = false,
    public users: User[] = []
  ) {
    this.id = id++;
  }
}
