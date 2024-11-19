import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View } from 'react-native';

type PortalType = {
  id: string;
  content: ReactNode;
  onHide?: () => Promise<void>;
};

export type PortalContextType = {
  showPortal?: (portal: PortalType) => void;
  hidePortal?: (id: string) => void;
};

const PortalContext = createContext<PortalContextType>({
  showPortal: () => {},
  hidePortal: () => {},
});

let portalInstance: {
  showPortal: (portal: PortalType) => void;
  hidePortal: (id: string) => void;
} | null = null;

// 定义全局 API
export const Portal = {
  show: ({
    content,
    onHide,
  }: {
    content: ReactNode;
    onHide?: () => Promise<void>;
  }) => {
    const id = `${Date.now()}`;
    portalInstance?.showPortal({
      id,
      content,
      onHide,
    });

    return () => Portal.hide(id);
  },
  hide: (id: string) => {
    portalInstance?.hidePortal(id);
  },
};

// PortalManager 用于连接全局 API 和 Provider
export const PortalManager = () => {
  const { showPortal, hidePortal } = usePortal();
  useEffect(() => {
    if (showPortal && hidePortal) {
      portalInstance = { showPortal, hidePortal };
    }
    return () => {
      portalInstance = null;
    };
  }, [showPortal, hidePortal]);

  return null;
};

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  // 存放所有 Portal 组件
  const [portals, setPortals] = useState<PortalType[]>([]);

  const showPortal = (portal: PortalType) => {
    setPortals((prev) => [...prev, portal]);
  };

  const hidePortal = async (id: string) => {
    const find = portals.find((p) => p.id === id);
    if (!find) {
      return;
    }
    if (find.onHide) {
      await find.onHide();
    }
    setPortals((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    // @ts-ignore
    <PortalContext.Provider value={{ showPortal, hidePortal }}>
      {children}
      {/* 渲染所有 Portals 到顶层 */}
      <View>
        {portals.map((item) => (
          <View key={item.id}>{item.content}</View>
        ))}
      </View>

      <PortalManager />
    </PortalContext.Provider>
  );
};

// 自定义 hook 来使用 Portal 上下文
export const usePortal = () => useContext(PortalContext);
