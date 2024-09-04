import type light from '@/components/style/theme/light';

type KeyPaths<
  T extends Record<string, any>, // 对象类型
  U extends string = '.', // 连接符
  C extends string = '', // 累计值（初始为空字符串）
  K = keyof T,
> = K extends string // 仅当 K 为字符串时处理
  ? T[K] extends Record<string, any> // 检查 T[K] 是否为对象类型
    ?
        | KeyPaths<T[K], U, `${C}${C extends '' ? '' : U}${K}`>
        | `${C}${C extends '' ? '' : U}${K}` // 递归构建路径
    : `${C}${C extends '' ? '' : U}${K}` // 构建最终路径
  : never; // 否则终止

export type ThemeKey = KeyPaths<typeof light>;

// const a: Theme = '';
