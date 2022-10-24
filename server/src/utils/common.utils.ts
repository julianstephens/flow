import * as _ from "lodash";

export const hasNilProps = (obj: any): boolean => _.values(obj).every(_.isNil);

export const omitObjProps = (obj: any, props: string[]): any =>
  _.omitBy(obj, (val, key) => props.includes(key));
