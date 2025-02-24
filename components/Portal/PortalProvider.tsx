import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View } from 'react-native';

type PortalType = {
  // 唯一标识
  id: string;
  // 默认是否打开
  defaultOpen?: boolean;
  // render 函数
  content:
    | ReactNode
    | ((props: {
        open: boolean;
        onOpenChange: (v: boolean) => void;
      }) => ReactNode);
};

export type PortalContextType = {
  // 挂载
  mountPortal: (portal: PortalType) => void;
  // 卸载
  unloadPortal: (id: string) => void;
  showPortal: (id: string) => void;
  hidePortal: (id: string) => void;
};

const PortalContext = createContext<PortalContextType>({
  mountPortal: () => {},
  unloadPortal: () => {},
  showPortal: () => {},
  hidePortal: () => {},
});

let portalInstance: PortalContextType | null = null;

// 延迟卸载的 timeoutId
const delayUnloadMap: { [key: string]: NodeJS.Timeout } = {};

// 定义全局 API
export const Portal = {
  // show: ({ content }: { content: PortalType['content'] }) => {
  //   const id = `${Date.now()}`;
  //   portalInstance?.mountPortal({
  //     id,
  //     content,
  //   });
  //
  //   return () => Portal.hide(id);
  // },
  // hide: (id: string) => {
  //   portalInstance?.unloadPortal(id);
  // },
  open: ({ content }: { content: PortalType['content'] }) => {
    const portalId = `${Date.now()}`;
    if (!portalInstance) {
      console.error('PortalProvider not found');
    }
    portalInstance?.mountPortal({
      id: portalId,
      defaultOpen: true,
      content,
    });
    portalInstance?.showPortal(portalId);
    return portalId;
  },
  // 关闭后卸载
  closeAndUnload: (id: string, delay = 300) => {
    portalInstance?.hidePortal(id);
    if (delayUnloadMap[id]) {
      clearTimeout(delayUnloadMap[id]);
    }
    delayUnloadMap[id] = setTimeout(() => {
      portalInstance?.unloadPortal(id);
    }, delay);
  },
  // 卸载
  unload: (id: string) => {
    portalInstance?.unloadPortal(id);
  },
};

// PortalManager 用于连接全局 API 和 Provider
export const PortalManager = () => {
  const { mountPortal, unloadPortal, showPortal, hidePortal } = usePortal();
  useEffect(() => {
    if (!portalInstance) {
      portalInstance = {
        mountPortal,
        unloadPortal,
        showPortal,
        hidePortal,
      };
    }
    return () => {
      portalInstance = null;
    };
  }, [mountPortal, unloadPortal, showPortal, hidePortal]);

  return null;
};

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  // 存放所有 Portal 组件
  const [portals, setPortals] = useState<PortalType[]>([]);

  // 控制 Portals 是否打开
  const [portalsOpen, setPortalsOpen] = useState<{ [key: string]: boolean }>(
    {},
  );

  const mountPortal = useCallback((portal: PortalType) => {
    setPortals((prev) => {
      const find = prev.find((p) => p.id === portal.id);
      if (find) {
        return prev;
      }
      return [...prev, portal];
    });

    setPortalsOpen((prev) => {
      return {
        ...prev,
        [portal.id]: portal.defaultOpen || false,
      };
    });
  }, []);

  const unloadPortal = async (id: string) => {
    const find = portals.find((p) => p.id === id);
    if (!find) {
      return;
    }
    setPortals((prev) => prev.filter((p) => p.id !== id));
    setPortalsOpen((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  // 控制 Portal 是否打开
  const setPortalOpen = (id: string, isOpen: boolean) => {
    setPortalsOpen((prev) => {
      return {
        ...prev,
        [id]: isOpen,
      };
    });
  };

  const showPortal = (id: string) => {
    setPortalOpen(id, true);
  };

  const hidePortal = (id: string) => {
    setPortalOpen(id, false);
  };

  return (
    <PortalContext.Provider
      value={{ mountPortal, unloadPortal, showPortal, hidePortal }}
    >
      {children}
      {/* 渲染所有 Portals 到顶层 */}
      <View id={'portal-root'}>
        {portals.map((item) => {
          const Content = item.content;
          const isOpen = portalsOpen[item.id];
          return (
            <View key={item.id}>
              {typeof Content === 'function' ? (
                <Content
                  open={isOpen}
                  onOpenChange={(open) => setPortalOpen(item.id, open)}
                />
              ) : (
                Content
              )}
            </View>
          );
        })}
      </View>

      <PortalManager />
    </PortalContext.Provider>
  );
};

// 自定义 hook 来使用 Portal 上下文
export const usePortal = () => useContext(PortalContext);
