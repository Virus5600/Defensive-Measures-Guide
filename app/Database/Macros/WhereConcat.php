<?php

namespace App\Database\Macros;

use DB;
use Exception;

/**
 * WhereConcat
 */
class WhereConcat
{
	/**
	 * Memoize columns from table
	 *
	 * @var array
	 */
	private static $columnListings = [];

	/**
	 * @param $builder
	 * @param $columns
	 * @param string $operator
	 * @param null $value
	 * @return mixed
	 * @throws \Exception
	 */
	public static function whereConcat($builder, array $columns = [], $operator = '=', $value = null)
	{
		$phrase = self::Builder($builder, $columns);

		// e.g. ->whereConcat([...], 'myvalue');
		if ($value === null) {
			$value = $operator;
			$operator = '=';
		}

		return $builder->whereRaw("{$phrase} {$operator} ?", $value);
	}

	/**
	 * @param $builder
	 * @param $columns
	 * @param string $operator
	 * @param null $value
	 * @return mixed
	 * @throws \Exception
	 */
	public static function orWhereConcat($builder, array $columns = [], $operator = '=', $value = null)
	{
		$phrase = self::Builder($builder, $columns);

		// e.g. ->orWhereConcat([...], 'myvalue');
		if ($value === null) {
			$value = $operator;
			$operator = '=';
		}

		return $builder->orWhereRaw("{$phrase} {$operator} ?", $value);
	}

	/**
	 * @param $builder
	 * @param $columns
	 * @return string
	 * @throws \Exception
	 */
	private static function Builder($builder, array $columns = []): string
	{
		// SQL driver name as lowercase
		$driverName = self::getDatabaseDriverName($builder);

		// Columns from the table
		$tableColumns = self::getColumnsForTable($builder->from);

		// Determine how to wrap our field names
		$filter = function ($field) use ($tableColumns) {
			$table = null;
			$field = preg_split('/\./', $field);
			$hasTablePrefix = count($field) > 1;

			// If the field is prefixed with a table name, split them so we can wrap the field name
			// with backticks or quotes depending on the driver.
			if ($hasTablePrefix) {
				$table = $field[0];
				$field = $field[1];
			} else
				$field = $field[0];

			$toReturn = null;
			if (in_array($field, $tableColumns)) {
				$toReturn = "`{$field}`";
			} else {
				if ($table != null)
					$tableColumns = self::getColumnsForTable($table);

				$toReturn = in_array($field, $tableColumns)
					? "`{$table}`.`{$field}`"
					: "'" . addslashes($field) . "'";
			}

			return $toReturn;
		};

		// Differentiate concatenation techniques per driver
		switch ($driverName) {
			case 'mysql':
				$concatPhrase = 'CONCAT(' . implode(', ', array_map($filter, $columns)) . ')';
				break;

			case 'sqlite':
				$concatPhrase = implode(' || ', array_map($filter, $columns));
				break;

			default:
				throw new Exception('Unsupported driver for whereConcat');
				break;
		}

		return $concatPhrase;
	}

	/**
	 * Fetch column listings for the table and cache them
	 *
	 * @param string $tableName
	 * @return array
	 */
	private static function getColumnsForTable(string $tableName): ?array
	{
		if (!isset(self::$columnListings[$tableName])) {
			self::$columnListings[$tableName] = DB::getSchemaBuilder()->getColumnListing($tableName);
		}

		return self::$columnListings[$tableName];
	}

	/**
	 * Return a simplified driver name for our connection that we
	 * can switch on.
	 *
	 * @return string
	 */
	private static function getDatabaseDriverName($builder): string
	{
		return strtolower($builder->getConnection()->getDriverName());
	}
}
