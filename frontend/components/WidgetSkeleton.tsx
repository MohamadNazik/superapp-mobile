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
import React from "react";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "./Skeleton";

const WidgetSkeleton = () => (
  <View style={styles.container}>
    <Skeleton width={66} height={66} borderRadius={12} />
    <Skeleton width={48} height={10} style={{ marginTop: 8 }} />
  </View>
);

export const WidgetSkeletonGrid = ({ count = 8 }: { count?: number }) => (
  <View style={styles.grid}>
    {Array.from({ length: count }).map((_, index) => (
      <WidgetSkeleton key={index} />
    ))}
  </View>
);

export default WidgetSkeleton;

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  container: {
    width: "25%",
    marginBottom: 24,
    alignItems: "center",
    paddingHorizontal: 4,
  },
});
