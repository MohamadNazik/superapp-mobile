// Copyright (c) 2025 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { lockAsync, OrientationLock } from "expo-screen-orientation";

/**
 * Hook for managing root app layout initialization
 */
export const useAppLayout = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Called by AppInitializer once auth restoration has actually completed
  const onAppLoadComplete = useCallback(() => {
    setIsAuthResolved(true);
  }, []);

  // Minimum splash screen time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimeElapsed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // The app is only ready once fonts are loaded AND auth state is resolved,
  // so the splash never hides before authentication status is genuinely known.
  useEffect(() => {
    if (fontsLoaded && isAuthResolved) {
      setIsAppReady(true);
    }
  }, [fontsLoaded, isAuthResolved]);

  // Lock screen orientation to portrait mode
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await lockAsync(OrientationLock.PORTRAIT_UP);
      } catch (error) {
        console.error("Error locking orientation:", error);
      }
    };

    lockOrientation();
  }, []);

  const showSplash = !isAppReady || !isMinTimeElapsed;

  return {
    showSplash,
    onAppLoadComplete,
  };
};
