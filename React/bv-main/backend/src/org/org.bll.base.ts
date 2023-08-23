import { FilterData } from "../common/filter_data_handlers";
import { CustomerNS } from "../customer/customer";
import { OrgNS } from "./org";

export class OrgBLLBase implements OrgNS.BLL {
  constructor(
    private dal: OrgNS.DAL
  ) { }

  async init() { }

  async ListOrg() {
    return this.dal.ListOrg();
  }

  async CreateOrg(params: OrgNS.CreateOrgParams) {
    const now = Date.now();
    const org: OrgNS.Org = {
      id: OrgNS.Generator.NewOrgId(),
      name: params.name,
      ctime: now,
      mtime: now,
    };
    await this.dal.CreateOrg(org);
    return org;
  }

  async ListUser() {
    const users = await this.dal.ListUser();
    const docs = FilterData<OrgNS.User>(users);
    return OrgNS.SortAble.Role(docs);
  }

  async GetUser(id: string) {
    const user = await this.dal.GetUser(id);
    if (!user) {
      throw OrgNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async GetUserByUsername(username: string) {
    const user = await this.dal.GetUserByUsername(username);
    if (!user) {
      throw OrgNS.Errors.ErrUserNotFound;
    }
    return user;
  }

  async CreateUser(params: OrgNS.CreateUserParams) {
    const now = Date.now();
    const user : OrgNS.User = {
      id: OrgNS.Generator.NewUserId(),
      username: params.username,
      org_id: params.org_id,
      roles: params.roles,
      full_name: params.full_name.toUpperCase(),
      gender: params.gender,
      phone: params.phone,
      birthday: params.birthday,
      ctime: now,
      mtime: now,
    };
    await this.dal.CreateUser(user);
    return user;
  }

  async UpdateUser(id: string, params: OrgNS.UpdateUserParams) {
    const doc = await this.GetUser(id);
    const user = {...doc, ...params};
    user.mtime = Date.now();
    await this.dal.UpdateUser(user);
  }

  async DeleteUser(id: string) {
    const user = await this.GetUser(id);
    user.dtime = Date.now();
    await this.dal.UpdateUser(user);
    return user;
  }
}
