# AppDynamics Data Source

AppDynamics Data Source for Grafana

This software is forked from the original plugin [created by David Lopes](https://github.com/dlopes7). [While this version of the data source is free and open-source, the original plugin was converted to a Grafana Premium Plugin.](https://github.com/grafana/grafana-plugin-repository/pull/189) If you require official support or the latest updates by the Grafana team, have a look at [Grafana's support subscription plans](https://grafana.com/services/support).

This software is not affiliated with or supported by AppDynamics.

## Building the Data Source

The data source can be build using the following command:

    npm run dev

This creates a `dist` directory which contains the data source that can be mounted by Grafana.

During development, the following command can be used to watch the sources an rebuild them if they change:

    npm run watch